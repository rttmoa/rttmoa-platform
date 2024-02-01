// import { Columns } from 'antd/lib/table/Column'
import { TableProps } from "antd/lib/table/InternalTable";
interface queryActionType {
  (arg: any): Promise<any>;
}
interface ColumnFunc {
  // (updateMethod: queryActionType): Array<Columns>
  (updateMethod: queryActionType): Array<any>;
}
export interface ArgTableProps {
  baseProps?: TableProps<any>;
  owncolumns: ColumnFunc;
  queryAction: queryActionType;
  params: any;
  listName?: string;
}
export interface paginationInitialType {
  current: number;
  pageSize: number;
  total: number;
}
export interface initialStateType {
  loading: boolean;
  pagination: paginationInitialType;
  dataSource: Array<any>;
}
export interface actionType {
  type: string;
  payload?: any;
}
