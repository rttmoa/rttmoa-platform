/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { Card, Typography, Button, Space, Select, Divider } from "antd";
import TableBasic from "./components/tableBasic";
import FormBaisc from "./components/formBasic";
import FromLayout from "./components/formLayout";
import FormDisabled from "./components/formDisabled";
import FormSize from "./components/formSize";
import FormValidateOther from "./components/formValidateOther";
import FormValidateStatic from "./components/formValidateStatic";
import FormLogin from "./components/formLogin";
import FormRegister from "./components/formRegister";
import FormModal from "./components/formModal";
import FormTime from "./components/formTime";
import FormWithout from "./components/formWithout";
import "./index.less";
import { useLocation, useNavigate } from "react-router-dom";
import SelectComp from "./selectComp";
const { Text, Title } = Typography;

// ? Table
const BasicTable: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let initValue = location.search ? location.search.split("=")[1] : "TableBasic";
  const [value, setValue] = React.useState<string>(initValue);

  // 要新添加 ? 自定义表单控件、多表单联动、内联登陆栏、普通登陆框、注册新用户、弹出层中的新建表单、时间类控件、自行处理表单数据
  const handleChange = (value: string) => {
    setValue(value);
    navigate(`/form/basicTable?select=${value}`);
  };

  return (
    <>
      <Card className="mb10">
        <Title level={4} className="mb15">
          基础表格 - <Text>当有大量结构化的数据需要展现时 / 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。</Text>
        </Title>
        <SelectComp handleChange={handleChange} initValue={initValue} />
      </Card>
      <Card className="mb10">
        <TableBasic isShow={value === "TableBasic"} />
        <FormBaisc value={value} />
        <FromLayout value={value} />
        <FormDisabled value={value} />
        <FormSize value={value} />
        <FormLogin value={value} />
        <FormRegister value={value} /> {/* ! reference */}
        <FormModal value={value} /> {/* reference */}
        <FormTime value={value} /> {/* reference */}
        <FormWithout value={value} /> {/* reference */}
        <FormValidateStatic value={value} />
        <FormValidateOther value={value} />
      </Card>
    </>
  );
};

export default BasicTable;
