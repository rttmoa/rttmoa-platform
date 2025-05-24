import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

export function isDevFn(mode: string): boolean {
	return mode === 'development'
}

export function isProdFn(mode: string): boolean {
	return mode === 'production'
}

export function isTestFn(mode: string): boolean {
	return mode === 'test'
}

/**
 * Whether to generate package preview
 */
export function isReportMode(): boolean {
	return process.env.VITE_REPORT === 'true'
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
	const ret: any = {}
	for (const envName of Object.keys(envConf)) {
		let realName = envConf[envName].replace(/\\n/g, '\n')
		realName = realName === 'true' ? true : realName === 'false' ? false : realName // 将 string 转 boolean
		if (envName === 'VITE_PORT') realName = Number(realName)
		if (envName === 'VITE_PROXY') {
			try {
				realName = JSON.parse(realName)
			} catch (error) {
				console.log(error)
			}
		}
		ret[envName] = realName
	}
	return ret
}

/**
 * Get user root directory
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
	return path.resolve(process.cwd(), ...dir)
}

/**
 * 获取以指定前缀开头的环境变量
 * @param match prefix
 * @param confFiles ext
 */
function getEnvConfig(match = 'VITE_GLOB_', confFiles = ['.env', '.env.production']) {
	let envConfig = {}
	confFiles.forEach(item => {
		try {
			const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)))
			envConfig = { ...envConfig, ...env }
		} catch (error) {
			console.error(`Error in parsing ${item}`, error)
		}
	})

	Object.keys(envConfig).forEach(key => {
		const reg = new RegExp(`^(${match})`)
		if (!reg.test(key)) {
			Reflect.deleteProperty(envConfig, key)
		}
	})
	return envConfig
}
