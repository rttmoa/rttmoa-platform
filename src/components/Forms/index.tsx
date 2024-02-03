import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select } from "antd";
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
function formateDate(time: string | number) {
  if (!time) return "";
  const date = new Date(time);
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const data = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${date.getFullYear()}-${month}-${data}`;
}

export default function MultiForm(props: any) {
  const { filterSubmit, multiForm } = props;

  // 表单提交按钮
  const Submit = () => {
    let filterValue = multiForm.getFieldsValue();
    console.log("filterValue", filterValue);
    if (filterValue.startTime) {
      filterValue.startTime = formateDate(filterValue.startTime);
    }
    if (filterValue.endTime) {
      filterValue.endTime = formateDate(filterValue.endTime);
    }
    filterSubmit && filterSubmit(filterValue);
  };

  // 重置按钮
  const reset = () => {
    console.log("重置按钮");
    multiForm.resetFields();
  };

  const initFormList = (): any[] => {
    const { formList, extendFormList } = props;
    let formItemList: any[] = [];
    if (formList && formList.length > 0) {
      formList.forEach((item: any, index: number) => {
        const { label, field, tree, type, initialValue, placeholder, width, name } = item;

        if (type === "TIME") {
          const begin_time = (
            <Form.Item name={"startTime"} label={"开始时间"} key={"startTime"}>
              <DatePicker style={width} showTime={true} placeholder={placeholder} format="YYYY-MM-DD hh:mm:ss" />
            </Form.Item>
          );
          formItemList.push(begin_time);
          const end_time = (
            <Form.Item label="结束时间" name={"endTime"} key={"endTime"}>
              <DatePicker style={width} showTime={true} placeholder={placeholder} format="YYYY-MM-DD hh:mm:ss" />
            </Form.Item>
          );
          formItemList.push(end_time);
        } else if (type === "INPUT") {
          const INPUT = (
            <Form.Item name={field} label={label} key={field}>
              <Input type="text" style={{ width }} placeholder={placeholder} />
            </Form.Item>
          );
          formItemList.push(INPUT);
        } else if (item.type === "SELECT") {
          const SELECT = (
            <Form.Item name={field} label={label} key={field}>
              <Select style={{ width }} placeholder={placeholder}>
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

    // 展开的表单
    if (extendFormList && extendFormList.length > 0) {
      extendFormList.forEach((item: any) => {
        const { label, field, tree, type, initialValue, placeholder, width, name, style } = item;
        if (type === "INPUT") {
          const INPUT = (
            <Form.Item name={field} label={label} key={field} style={style}>
              <Input type="text" placeholder={placeholder} style={{ width }} />
            </Form.Item>
          );
          if (props.moreSearch === true) {
            formItemList.push(INPUT);
          } else {
            formItemList.push([]);
          }
        } else if (type === "SELECT") {
          const SELECT = (
            <Form.Item name={field} label={label} key={field} style={style}>
              <Select style={{ width }} placeholder={placeholder}>
                {getOptionList(item.list)}
              </Select>
            </Form.Item>
          );
          if (props.moreSearch === true) {
            formItemList.push(SELECT);
          } else {
            formItemList.push([]);
          }
        }
      });
    }

    return formItemList;
  };
  return (
    <div>
      <Form layout="inline" form={multiForm}>
        <Row style={{ width: "100%" }} gutter={16} wrap={false}>
          <Col className="gutter-row" span={18} style={{ display: "flex", flexWrap: "wrap" }}>
            {initFormList()}
          </Col>
          <Col span={6}>
            <Form.Item>
              <Button type="primary" className="mx-3" onClick={Submit}>
                查询
              </Button>
              <Button onClick={reset}>重置</Button>
              <a
                href="javascript:;"
                style={{ position: "relative", top: "0px", left: "20px" }}
                onClick={() => {
                  props.changeExport(!props.moreSearch);
                }}
              >
                {props && props.extendFormList && props.extendFormList.length > 0
                  ? props.moreSearch === false
                    ? "展开"
                    : "收起"
                  : ""}
              </a>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
