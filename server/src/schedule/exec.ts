import { check_documents } from "./components/check_Documents";
import { startSchedule } from "./index";
import { history_task } from "./components/history_task";
import { other_task } from "./components/other_task";




// 修改 this.logTimerOnce("Material_Barcode_Rule", "定时器 > 其他任务 > 原料库移库表：校验字段并写入出入库任务表中"); 中的 Key


export const exec_Schedule_ConfigList = [
	...other_task.filter(v => v.enabled),
	...check_documents.filter(v => v.enabled), // 校验字段
	...history_task.filter(v => v.enabled), // 历史任务（单据 + PDA收货 + PDA出库）
];

export const exec_Schedule_KeyList = exec_Schedule_ConfigList.map(v => v.key);

export const startAllSchedules = () => {
	let delayMs = 0;
	const intervalMs = 200;

	const startScheduleGroup = (taskList: typeof exec_Schedule_ConfigList, logText: string) => {
		const keyList = taskList
			.filter(v => v.enabled)
			.map(v => v.key)
			.filter(Boolean);

		keyList.forEach((key: string, idx: number) => startSchedule(key, delayMs + idx * intervalMs));
		delayMs += keyList.length * intervalMs;
		setTimeout(() => {
			console.dir(`=========== ${logText} ============`)
			console.dir(``)
		}, delayMs);
	};

	startScheduleGroup(other_task, "其他任务部分");
	startScheduleGroup(check_documents, "校验创建的单据字段部分");
	startScheduleGroup(history_task, "历史任务部分");


 
};
