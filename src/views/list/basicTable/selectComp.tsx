import { Select, Space, Typography } from "antd";
import React from "react";
const { Text, Title } = Typography;

export const selectOption = [
  { label: "基本用法 Basic", value: "TableBasic" },
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

const SelectComp = ({ handleChange, initValue }: any) => {
  return (
    <>
      <Space direction="horizontal">
        <Title level={5}>{selectOption.length} * items - </Title>
        <Select
          // defaultValue="FromCollectUser" // 指定默认选中的条目
          style={{ width: 250 }}
          listHeight={550} // 设置弹窗滚动高度
          onChange={handleChange} // 选中 option，或 input 的 value 变化时，调用此函数
          options={selectOption} // 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能
          value={initValue} // 指定当前选中的条目，多选时为一个数组。（value 数组引用未变化时，Select 不会更新）
          // loading
          // disabled
          // autoFocus
          // defaultActiveFirstOption={false}
          // defaultOpen // 是否默认展开下拉菜单
          // dropdownStyle={{color: '#f5f5f5', backgroundColor:'#f5f5f5'}}
          // virtual
          // size="middle"
          showSearch // 配置是否可搜索
          // onMouseEnter={() => {console.log("鼠标移入");}}
          // onMouseLeave={() => {console.log("鼠标移出");}}
          // onSearch={() => {console.log("文本框值变化时回调");}}
          // allowClear
          // onClear={() => {console.log("清除内容时回调");}}
        />
      </Space>
    </>
  );
};

export default SelectComp;
