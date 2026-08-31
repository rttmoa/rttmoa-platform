import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import axios, { AxiosInstance } from "axios";
import * as http from "http";
import * as https from "https";
import { exec_Schedule_ConfigList } from "./exec";

type HttpMethod = "POST" | "GET";

type TaskConfig = {
	key: string;
	method: HttpMethod;
	targetUrl: string;
	intervalSec: number | string;
	enabled: boolean;
};

type TaskState = {
	running: boolean;
	inFlight: number;
	lastRunAt?: Date;
	lastSuccessAt?: Date;
	lastError?: string;
	lastStatusCode?: number;
};

type ScheduleLog = {
	key: string;
	time: Date;
	success: boolean;
	statusCode?: number;
	durationMs: number;
	attempt: number;
	message?: string;
};

const parseScheduleIntervalMs = (interval: number | string, key: string) => {
	if (typeof interval === "number") {
		if (!Number.isFinite(interval) || interval <= 0) {
			throw new Error(`[schedule] invalid interval for ${key}: ${interval}. Expected a positive number of seconds.`);
		}
		return Math.floor(interval * 1000);
	}

	const raw = String(interval).trim().toLowerCase();
	const matched = raw.match(/^(\d+)\s*(ms|s|sec|secs|min|mins|m|h|hr|hrs|d|day|days)$/);
	if (!matched) {
		throw new Error(`[schedule] invalid interval for ${key}: ${interval}. Supported formats: 1s, 10s, 1min, 5m, 1h, 1d, 500ms.`);
	}

	const value = Number(matched[1]);
	const unit = matched[2];
	if (!Number.isFinite(value) || value <= 0) {
		throw new Error(`[schedule] invalid interval for ${key}: ${interval}. Interval must be greater than 0.`);
	}

	// 现在完整支持的格式
	// - 毫秒： 500ms
	// - 秒： 3s 、 10sec
	// - 分钟： 5m 、 5min
	// - 小时： 1h 、 2hr
	// - 天： 1d 、 1day 、 2days
	switch (unit) {
		case "ms":
			return value;
		case "s":
		case "sec":
		case "secs":
			return value * 1000;
		case "m":
		case "min":
		case "mins":
			return value * 60 * 1000;
		case "h":
		case "hr":
		case "hrs":
			return value * 60 * 60 * 1000;
		case "d":
		case "day":
		case "days":
			return value * 24 * 60 * 60 * 1000;
		default:
			throw new Error(`[schedule] invalid interval for ${key}: ${interval}. Unsupported unit.`);
	}
};

class TaskRunner {
	private intervalTimer: any;
	private startTimer: any;
	private axios: AxiosInstance;
	private config: TaskConfig;
	private state: TaskState = { running: false, inFlight: 0 };
	private readonly guard: () => boolean;
	private readonly onStart: () => void;
	private readonly onEnd: () => void;
	private logs: ScheduleLog[] = [];

	constructor(config: TaskConfig, guard: () => boolean, onStart: () => void, onEnd: () => void) {
		this.config = config;
		parseScheduleIntervalMs(this.config.intervalSec, this.config.key);
		this.guard = guard;
		this.onStart = onStart;
		this.onEnd = onEnd;
		const timeout = Number(process.env.SCHEDULE_HTTP_TIMEOUT_MS || 5000);
		this.axios = axios.create({
			timeout: Number.isFinite(timeout) ? timeout : 5000,
			proxy: false,
			httpAgent: new http.Agent({ keepAlive: false }),
			httpsAgent: new https.Agent({ keepAlive: false }),
			headers: { Connection: "close" },
			validateStatus: () => true,
		});
	}

	private log(entry: ScheduleLog) {
		this.logs.push(entry);
		if (this.logs.length > 2000) this.logs.shift();
	}

	private async delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	private async requestWithRetry() {
		let attempt = 0;
		const envMax = Number(process.env.SCHEDULE_MAX_RETRIES || 3);
		const max = Number.isFinite(envMax) && envMax > 0 ? Math.floor(envMax) : 0;
		while (attempt <= max) {
			const startAt = Date.now();
			try {
				attempt += 1;
				const res = this.config.method === "GET" ? await this.axios.get(this.config.targetUrl) : await this.axios.post(this.config.targetUrl, {});
				const durationMs = Date.now() - startAt;
				this.log({ key: this.config.key, time: new Date(), success: true, statusCode: res.status, durationMs, attempt });
				return res;
			} catch (err: any) {
				const status = err?.response?.status;
				const message = err?.message || "request failed";
				const durationMs = Date.now() - startAt;
				this.log({ key: this.config.key, time: new Date(), success: false, statusCode: status, durationMs, attempt, message });
				if (attempt > max) throw err;
				await this.delay(500);
			}
		}
	}

	private async tick() {
		if (!this.config.enabled) return;
		if (this.state.inFlight > 0) return;
		if (!this.guard()) return;
		this.state.inFlight += 1;
		this.onStart();
		this.state.lastRunAt = new Date();
		try {
			const res = await this.requestWithRetry();
			this.state.lastSuccessAt = new Date();
			this.state.lastStatusCode = res?.status;
			this.state.lastError = undefined;
		} catch (err: any) {
			this.state.lastError = err?.message || "unknown error";
			this.state.lastStatusCode = err?.response?.status;
			const code = err?.code ? String(err.code) : "";
			console.warn(`[schedule] ${this.config.key} -> ${this.config.targetUrl} failed: ${this.state.lastStatusCode || ""} ${code} ${this.state.lastError || ""}`.trim());
		} finally {
			this.state.inFlight -= 1;
			this.onEnd();
		}
	}

	start(startDelayMs = 0) {
		if (this.intervalTimer || this.startTimer) return;
		this.state.running = true;
		const delay = Math.max(0, Number(startDelayMs) || 0);
		const intervalMs = parseScheduleIntervalMs(this.config.intervalSec, this.config.key);
		this.startTimer = setTimeout(() => {
			this.startTimer = null;
			this.tick();
			this.intervalTimer = setInterval(() => this.tick(), intervalMs);
		}, delay);
	}

	stop() {
		if (this.startTimer) {
			clearTimeout(this.startTimer);
			this.startTimer = null;
		}
		if (this.intervalTimer) {
			clearInterval(this.intervalTimer);
			this.intervalTimer = null;
		}
		this.state.running = false;
	}

	status(): { config: TaskConfig; state: TaskState; logs: ScheduleLog[] } {
		return { config: this.config, state: this.state, logs: this.logs.slice(-50) };
	}

	updateConfig(partial: Partial<TaskConfig>) {
		this.config = { ...this.config, ...partial };
		const intervalMs = parseScheduleIntervalMs(this.config.intervalSec, this.config.key);
		if (this.intervalTimer) {
			clearInterval(this.intervalTimer);
			this.intervalTimer = setInterval(() => this.tick(), intervalMs);
		}
	}
}

class MultiScheduler {
	private tasks = new Map<string, TaskRunner>();
	private maxTotalConcurrent = Number(process.env.SCHEDULE_MAX_TOTAL_CONCURRENT || 4);
	private totalInFlight = 0;

	private canRun = () => this.totalInFlight < this.maxTotalConcurrent;
	private onStart = () => {
		this.totalInFlight += 1;
	};
	private onEnd = () => {
		this.totalInFlight = Math.max(0, this.totalInFlight - 1);
	};

	async init() {
		const seeds = exec_Schedule_ConfigList;

		for (let i = 0; i < seeds.length; i++) {
			const cfg: any = seeds[i];
			const runner = new TaskRunner(cfg, this.canRun, this.onStart, this.onEnd);
			this.tasks.set(cfg.key, runner);
		}
	}

	// ! 开始执行任务
	startTask(key: string, startDelayMs = 0) {
		// console.log("this.tasks", key);
		const t = this.tasks.get(key);
		if (!t) {
			console.warn(`[schedule] task not found: ${key}`);
			return;
		}
		const { config } = t.status();
		if (!config.enabled) return;
		// console.log(`[schedule] start ${key} -> ${config.targetUrl}`); // [schedule] start gwmsDetail -> http://127.0.0.1:4001/api/wcs_wms/Scheduled/gwmsDetail/status/manual
		t.start(startDelayMs);
	}

	stopTask(key: string) {
		const t = this.tasks.get(key);
		if (!t) return;
		const { config } = t.status();
		config.enabled = false;
		t.stop();
	}

	status(key?: string) {
		if (key) {
			const t = this.tasks.get(key);
			if (!t) return null;
			return t.status();
		}
		const out: Record<string, { config: TaskConfig; state: TaskState; logs: ScheduleLog[] }> = {};
		for (const [k, t] of this.tasks.entries()) {
			out[k] = t.status();
		}
		return out;
	}
}

export const scheduler = new MultiScheduler();
let schedulerReady: Promise<void> | null = null;
export const ensureSchedulerReady = () => {
	if (!schedulerReady) schedulerReady = scheduler.init();
	return schedulerReady;
};

export const startSchedule = (key: string, startDelayMs = 0) => {
	void ensureSchedulerReady().then(() => scheduler.startTask(key, startDelayMs));
};
export const stopSchedule = (key: string) => {
	void ensureSchedulerReady().then(() => scheduler.stopTask(key));
};
export const getScheduleStatus = (key?: string) => scheduler.status(key);
