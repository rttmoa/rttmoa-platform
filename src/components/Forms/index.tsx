import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import React from "react";

function getOptionList(data = []) {
  if (!data) {
    return [];
  }
  let options: any = []; //[<Option value="0" key="all_key">全部</Option>];
  data.forEach((item: any) => {
    options.push(
      <Select.Option value={item.id} key={item.id}>
        {item.name}
      </Select.Option>
    );
  });
  return options;
}

export default function MultiForm(props: any) {
  const { filterSubmit, multiForm } = props;

  // 表单提交按钮
  const handleFilterSubmit = () => {
    let filterValue = multiForm.getFieldsValue();
    console.log("filterValue", filterValue);
    filterSubmit && filterSubmit(filterValue);
  };

  // 重置按钮
  const reset = () => {
    console.log("重置按钮");
    multiForm.resetFields();
  };

  const initFormList = (): any[] => {
    const { formList } = props;
    let formItemList: any[] = [];
    if (formList && formList.length > 0) {
      formList.forEach((item: any, index: number) => {
        let label = item.label;
        let field = item.field; // ? 必传
        let initialValue = item.initialValue || "";
        let placeholder = item.placeholder;
        let width = item.width;
        let type = item.type;
        if (type === "时间查询") {
          const begin_time = (
            <Form.Item name={field} label={label ? label : "时间查询"} key={field}>
              <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          );
          formItemList.push(begin_time);
          const end_time = (
            <Form.Item label="~" name={field} colon={false} key={field}>
              <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          );
          formItemList.push(end_time);
        } else if (type === "INPUT") {
          const INPUT = (
            <Form.Item name={field} label={label} key={field}>
              <Input type="text" placeholder={placeholder} />
            </Form.Item>
          );
          formItemList.push(INPUT);
        } else if (item.type === "SELECT") {
          const SELECT = (
            <Form.Item name={field} label={label} key={field}>
              <Select style={{ width: width }} placeholder={placeholder}>
                {getOptionList(item.list)}
              </Select>
            </Form.Item>
          );
          formItemList.push(SELECT);
        } else if (item.type === "CHECKBOX") {
          const CHECKBOX = (
            <Form.Item name={field} label={label} key={field}>
              <Checkbox>{label}</Checkbox>
            </Form.Item>
          );
          formItemList.push(CHECKBOX);
        }
      });
    }
    return formItemList;
  };
  return (
    <Form layout="inline" form={multiForm}>
      <div className="flex justify-center align-middle">{initFormList()}</div>
      <Form.Item>
        <Button type="primary" className="mx-3" onClick={handleFilterSubmit}>
          查询
        </Button>
        <Button onClick={reset}>重置</Button>
      </Form.Item>
    </Form>
  );
}
