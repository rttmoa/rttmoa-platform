/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { Card, Typography, Button, Space, Select, Divider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.less";
import SelectComp from "./selectComp";
import TableBasic from "./components/tableBasic";
import TableSelectCustom from "./components/tableSelectCustom";
import TableFilterSort from "./components/tableFilterSort";
import TableFilterSearch from "./components/tableFilterSearch";
import TableFilterPanel from "./components/tableFilterPanel";
import TableAjax from "./components/tableAjax";
import TableTreeData from "./components/tableTreeData";
import TableFixedHeader from "./components/tableFixedHeader";
import TableFixedColumns from "./components/tableFixedColumns";
import TableFixedHeaderColumns from "./components/tableFixedHeaderColumns";
import TableHiddenColumns from "./components/tableHiddenColumns";
import TableGrouping from "./components/tableGrouping";
import TableEditCell from "./components/tableEditCell";
import TableEditRow from "./components/tableEditRow";
import TableSub from "./components/tableSub";
import TableEllipsis from "./components/tableEllipsis";
import TableVirtual from "./components/tableVirtual";
import TableResponsive from "./components/tableResponsive";
import TableSticky from "./components/tableSticky";
import TableDynamic from "./components/tableDynamic";

// ? Table
const BasicTable: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let initValue = location.search ? location.search.split("=")[1] : "TableBasic";
  const [value, setValue] = React.useState<string>(initValue);

  // 要新添加 ? 自定义表单控件、多表单联动、内联登陆栏、普通登陆框、注册新用户、弹出层中的新建表单、时间类控件、自行处理表单数据
  const handleChange = (value: string) => {
    setValue(value);
    navigate(`/list/basicTable?select=${value}`);
  };

  return (
    <>
      <Card className="mb10">
        <Space direction="vertical" size="large">
          <span className="mb15">
            <b>基础表格</b> - 当有大量结构化的数据需要展现时 / 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。
          </span>
          <SelectComp handleChange={handleChange} initValue={initValue} />
        </Space>
      </Card>
      <Card className="mb10">
        <TableBasic isShow={value === "TableBasic"} />
        <TableSelectCustom isShow={value === "TableSelectCustom"} />
        <TableFilterSort isShow={value === "TableFilterSort"} />
        <TableFilterSearch isShow={value === "TableFilterSearch"} />
        <TableFilterPanel isShow={value === "TableFilterPanel"} /> {/* ? 自定义筛选菜单 */}
        <TableAjax isShow={value === "TableAjax"} /> {/* ? 远程加载数据 (添加 size表格尺寸 & title,footer头部底部) */}
        <TableTreeData isShow={value === "TableTreeData"} />
        <TableFixedHeader isShow={value === "TableFixedHeader"} />
        <TableFixedColumns isShow={value === "TableFixedColumns"} />
        <TableFixedHeaderColumns isShow={value === "TableFixedHeaderColumns"} />
        <TableHiddenColumns isShow={value === "TableHiddenColumns"} />
        <TableGrouping isShow={value === "TableGrouping"} />
        <TableEditCell isShow={value === "TableEditCell"} />
        <TableEditRow isShow={value === "TableEditRow"} />
        <TableSub isShow={value === "TableSub"} />
        <TableEllipsis isShow={value === "TableEllipsis"} />
        <TableVirtual isShow={value === "TableVirtual"} />
        <TableResponsive isShow={value === "TableResponsive"} />
        <TableSticky isShow={value === "TableSticky"} />
        <TableDynamic isShow={value === "TableDynamic"} />
      </Card>
    </>
  );
};

export default BasicTable;
