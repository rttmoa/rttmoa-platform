export type FieldType = 'string' | 'number' | 'date' | 'select';

export interface FieldOption {
  label: string;
  value: any;
  color?: string;
}

export interface FieldConfig {
  sync?: string; // name：关联表名
  label: string; // 必填：字段名称（前端 title）
  type: FieldType; // 必填
  query?: boolean; // 是否参与查询
  editable?: boolean; // 是否可行内编辑
  width?: number;  // 表格列宽、默认150
  fixed?: string;  // 是否固定、默认不固定
  order?: number; // 表格列顺序显示
  sorter?: boolean; // 升序降序、默认可排序

  // number类型 数值处理
  int?: boolean; // 是否整数
  decimal?: boolean;  // 是否是小数
  precision?: number; // 保留几位小数
  
  options?: FieldOption[]; // 选择框： 配置项
  
  defaultSortOrder?: string; // 默认排序顺序
} 
export type FieldSchema = Record<string, FieldConfig>;
