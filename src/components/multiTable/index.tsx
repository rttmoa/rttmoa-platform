import { Table } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import React, { useState } from "react";

interface ETableProps {
  loading?: boolean;
  columns: any[];
  dataSource: any[];
  pagination: {};
  scroll?: {};
  rowSelection?: any;
  selectedRowKeys?: number[];
  selectedIds?: number[];
  selectedItem?: any[];
  updateSelectedItem?: (selectKey?: any, selectedRows?: any, selectedIds?: any) => void;
}

export default function ETable(props: ETableProps) {
  const { columns, selectedRowKeys, rowSelection, updateSelectedItem } = props;
  const [state, setState] = useState<any>({});

  if (columns && columns.length) {
    const name_list: any = {
      订单编号: 170,
      车辆编号: 80,
      手机号码: 96,
      用户姓名: 70,
      密码: 70,
      运维区域: 300,
      车型: 42,
      故障编号: 76,
      代理商编码: 97,
      角色ID: 64
    };
    columns.forEach((item: any) => {
      if (!item.title) return;
      if (!item.width) {
        if (item.title.indexOf("时间") > -1 && item.title.indexOf("持续时间") < 0) {
          item.width = 132;
        } else if (item.title.indexOf("图片") > -1) {
          item.width = 86;
        } else if (item.title.indexOf("权限") > -1 || item.title.indexOf("负责城市") > -1) {
          item.width = "40%";
          item.className = "text-left";
        } else {
          if (name_list[item.title]) {
            item.width = name_list[item.title];
          }
        }
      }
      item.bordered = false;
    });
  }

  const onSelectChange = (selectedRowKeys: any, selectedRows: any[]) => {
    // console.log("selectedRowKeys", selectedRowKeys) //  (4) [1, 2, 3, 4]
    // console.log('selectedRows', selectedRows) // (4) [{…}, {…}, {…}, {…}]
    let rowSelectProps = rowSelection;
    let selectedIds: number[] = [];
    if (rowSelectProps === "checkbox") {
      selectedRows.forEach((item: any) => {
        selectedIds.push(item.id);
      });
      setState({
        selectedRowKeys,
        selectedIds: selectedIds,
        selectedItem: selectedRows[0]
      });
    }
    updateSelectedItem && updateSelectedItem(selectedRowKeys, selectedRows[0], selectedIds);
  };

  // 勾选全选复选框
  const onSelectAll = (selected: any, selectedRows: any[], changeRows: any) => {
    let selectedIds: any[] = [];
    let selectKey: number[] = [];
    selectedRows.forEach((item: { id: any }, index: any) => {
      selectedIds.push(item.id);
      selectKey.push(index);
    });
    updateSelectedItem && updateSelectedItem(selectKey, selectedRows[0] || {}, selectedIds);
    // console.log('selectedIds[]', selectedIds) // id: (10) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    // console.log('selectKey[]', selectKey) // index: (10) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    // console.log('selectedRows', selectedRows) // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // console.log('selected', selected) // boolean
    // console.log('changeRows', changeRows) // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  };
  const onRowClick = (record: any, index: number) => {
    console.log("处理行点击事件 onRowClick");
    let rowSelection = props.rowSelection;
    if (rowSelection === "checkbox") {
      let selectedRowKeys = props.selectedRowKeys;
      let selectedIds = props.selectedIds;
      let selectedItem = props.selectedItem || [];
      if (selectedIds) {
        const i = selectedIds.indexOf(record.id);
        if (i === -1) {
          //避免重复添加
          selectedIds.push(record.id);
          selectedRowKeys && selectedRowKeys.push(index);
          selectedItem.push(record);
        } else {
          selectedIds.splice(i, 1);
          selectedRowKeys && selectedRowKeys.splice(i, 1);
          selectedItem.splice(i, 1);
        }
      } else {
        selectedIds = [record.id];
        selectedRowKeys = [index];
        selectedItem = [record];
      }
      updateSelectedItem && updateSelectedItem(selectedRowKeys, selectedItem || {}, selectedIds);
    } else {
      let selectKey = [index];
      const selectedRowKeys = this.props.selectedRowKeys;
      if (selectedRowKeys && selectedRowKeys[0] === index) {
        return;
      }
      updateSelectedItem && updateSelectedItem(selectKey, record || {});
    }
  };
  // const rowSelectConfig: TableRowSelection<T>['rowSelection'] = {}
  const rowSelectConfig: any = {
    type: "radio",
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record: any, selected: any, selectedRows: any) => {
      console.log("....");
    },
    onSelectAll: onSelectAll
  };
  let rowSelProps: any = rowSelection;
  // 当属性未false或者null时，说明没有单选或者复选列
  if ([false, null].includes(rowSelProps)) {
    rowSelProps = false;
  } else if (rowSelProps === "checkbox") {
    rowSelectConfig.type = "checkbox"; //设置类型未复选框
  } else {
    rowSelProps = "radio"; //默认未单选
  }
  // console.log(props);
  return (
    <Table
      {...props}
      bordered
      rowSelection={rowSelProps ? rowSelectConfig : null}
      onRow={(record: any, index: any) => ({
        onClick() {
          if (!rowSelProps) return;
          onRowClick(record, index);
        }
      })}
    />
  );
}
