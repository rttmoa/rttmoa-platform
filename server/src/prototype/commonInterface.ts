interface WCS {
	time?: string;
	pallet: string;
	taskNo: string;
	loc_start?: string;
	loc_end?: string;
	Priority?: number;

	teck?: () => true;

	conveyingLine: (line: number) => {};
	stackerFN: (stack: number) => {};
}
