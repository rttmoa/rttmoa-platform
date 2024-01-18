/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { Card, Typography, Button, Space, Select, Divider } from "antd";
import FormCollectUser from "./components/fomCollectUser";
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
const { Text, Title } = Typography;

// ? 选择表单类型
// Header由redux去控制
// 此处为父组件控制子组件传值
const BasicForm: React.FC = () => {
  // https://blog.csdn.net/Yin_yihui/article/details/129420273
  const navigate = useNavigate();
  const location = useLocation();
  let initValue = location.search ? location.search.split("=")[1] : "FromCollectUser";
  const [value, setValue] = React.useState<string>(initValue);

  // ! https://ant.design/components/form-cn
  // ! https://procomponents.ant.design/components/login-form
  let selectOption = [
    { label: "收集用户信息 User", value: "FromCollectUser" },
    { label: "表单基本使用 Basic", value: "FormBaisc" },
    { label: "表单三种布局 Layout", value: "FormLayout" },
    { label: "表单禁用 Disabled", value: "FormDisabled" },
    { label: "表单尺寸 Size", value: "FormSize" },
    { label: "普通登陆框 Login", value: "FormLogin" },
    { label: "新用户注册 Register", value: "FormRegister" },
    { label: "表单弹出层 Modal", value: "FormModal" },
    { label: "时间类控件 Time", value: "FormTime" },
    { label: "自行处理表单 Without", value: "FormWithout" },
    { label: "自定义校验 ValidateStatic", value: "ValidateStatic" },
    { label: "校验其他组件 ValidateOther", value: "FormValidateOther" }
  ];
  // 要新添加 ? 自定义表单控件、多表单联动、内联登陆栏、普通登陆框、注册新用户、弹出层中的新建表单、时间类控件、自行处理表单数据
  const handleChange = (value: string) => {
    setValue(value);
    navigate(`/form/basicForm?select=${value}`);
  };

  // ? 设计表单、？？
  return (
    <>
      <Card className="mb10">
        <Title level={4} className="mb15">
          基础表单
        </Title>
        <Text>表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。</Text>
        <br />
        <br />
        <Space>
          <Text className="mb15">
            <b>常用表单操作：</b>
          </Text>
          <Select
            // defaultValue="FromCollectUser"
            style={{ width: 250 }}
            listHeight={550}
            onChange={handleChange}
            options={selectOption}
            value={initValue}
          />
          {/* <Button onClick={() => setValue(value)}>查看</Button> */}
        </Space>
      </Card>
      <Card className="mb10">
        <hr />
        <FormCollectUser value={value} />
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

export default BasicForm;
