export type DriverConfig = {
	readonly url?: string;
	readonly host?: string;
	readonly port?: number;
	readonly username?: string;
	readonly password?: string;
	readonly database?: string;
	readonly domain?: string;
	readonly timezone?: string;
	readonly connectString?: string; 
	readonly logging?: boolean | Array<any>;
	readonly locale?: string;
	options?: any;
};

export type QueryOptions = {
	fields?: Array<string> | string;
	readonly filters?: any;
	readonly top?: number;
	readonly skip?: number;
	readonly sort?: string;
};

export interface Driver {
	databaseVersion?: string;
	config?: DriverConfig;
	connect(): any;
	close(): any;
	find(tableName: string, query: QueryOptions, userId?: number | string): any;
}
