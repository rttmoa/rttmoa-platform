import Common from "./common"; 

interface WCS {
	time?: string;
	pallet: string;
	taskNo: string;
	loc_start?: string;
	loc_end?: string;
	Priority?: number;

	teck?: () => {};
	conveyingLine: (line: number) => {};
	stackerFN: (stack: number) => {};
}


export default class CommonTest extends Common implements WCS {
	constructor() {
		super();
		console.log(this.uname);
		console.log(this.getId(2));
	}
	time?: string;
	pallet: string;
	taskNo: string;
	loc_start?: string;
	loc_end?: string;
	Priority?: number;
	teck?: () => {};
	conveyingLine: (line: number) => {};
	stackerFN: (stack: number) => {};
}
