import { httpUpack as http } from '..';

type Params = { [key: string]: any };

export type TableListViewResponse = {
	success: boolean;
	message?: string;
};

// 列表视图接口
export const saveTableListView = (params: Params) => http.post<TableListViewResponse>('/ConFig/TableListView', params);
export const initTableListView = (params: Params) => http.post<TableListViewResponse>('/ConFig/TableListView_Init', params);
