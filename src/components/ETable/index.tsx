import { Table } from "antd";
import React from "react";

export default function ETable(props: any) {
  const { columns, selectedRowKeys } = props;

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

  const onSelectChange = () => {};
  const onSelectAll = () => {};
  const onRowClick = (record: any, index: number) => {};
  const rowSelectConfig = {
    type: "radio",
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record: any, selected: any, selectedRows: any) => {
      console.log("....");
    },
    onSelectAll: onSelectAll
  };
  let rowSelProps = props.rowSelection;
  // 当属性未false或者null时，说明没有单选或者复选列
  if ([false, null].includes(rowSelProps)) {
    rowSelProps = false;
  } else if (rowSelProps === "checkbox") {
    rowSelectConfig.type = "checkbox"; //设置类型未复选框
  } else {
    rowSelProps = "radio"; //默认未单选
  }

  return (
    <Table
      {...props}
      className=""
      // bordered
      rowSelection={rowSelProps ? rowSelectConfig : null}
      scroll={{ x: 2000 }}
      onRow={(record: any, index: number) => {
        return {
          onClick() {
            if (!rowSelProps) return;
            onRowClick(record, index);
          }
        };
      }}
    />
  );
}
