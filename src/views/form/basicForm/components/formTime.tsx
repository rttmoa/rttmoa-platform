import React from "react";
import { Button, DatePicker, Form, TimePicker } from "antd";

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const onFinish = (fieldsValue: any) => {
  console.log("未处理的值：", fieldsValue);
  // date-picker: M2 {$L: 'zh-cn', $u: undefined, $d: Tue Jan 02 2024 11:30:39 GMT+0800 (中国标准时间), $y: 2024, $M: 0, …}
  // date-time-picker: M2 {$L: 'zh-cn', $u: undefined, $d: Tue Jan 02 2024 11:32:08 GMT+0800 (中国标准时间), $y: 2024, $M: 0, …}
  // month-picker: M2 {$L: 'zh-cn', $u: undefined, $d: Thu Jan 18 2024 11:34:39 GMT+0800 (中国标准时间), $y: 2024, $M: 0, …}
  // range-picker: (2) [M2, M2]
  // range-time-picker: (2) [M2, M2]
  // time-picker: M2 {$L: 'zh-cn', $u: undefined, $d: Thu Jan 18 2024 11:35:14 GMT+0800 (中国标准时间), $y: 2024, $M: 0, …}

  // 处理后的值：
  // date-picker: "2024-01-02"
  // date-time-picker:  "2024-01-02 11:32:08"
  // month-picker: "2024-01"
  // range-picker: (2) ['2024-01-05', '2024-01-13']
  // range-time-picker: (2) ['2024-01-11 11:34:56', '2024-01-19 11:34:59']
  // time-picker: "11:35:14"

  // 应在提交前格式化日期值.
  const rangeValue = fieldsValue["range-picker"]; // type: array
  const rangeTimeValue = fieldsValue["range-time-picker"]; // type: array
  const values = {
    ...fieldsValue,
    "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
    "date-time-picker": fieldsValue["date-time-picker"].format("YYYY-MM-DD HH:mm:ss"),
    "month-picker": fieldsValue["month-picker"].format("YYYY-MM"),
    "range-picker": [rangeValue[0].format("YYYY-MM-DD"), rangeValue[1].format("YYYY-MM-DD")],
    "range-time-picker": [rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"), rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss")],
    "time-picker": fieldsValue["time-picker"].format("HH:mm:ss")
  };
  console.log("Received values of form: ", values);
};
const App: React.FC<{ value: string }> = ({ value }) => {
  // ? 校验配置
  const config = {
    rules: [{ type: "object" as const, required: false, message: "Please select time!" }]
  };
  const rangeConfig = {
    rules: [{ type: "array" as const, required: false, message: "Please select time!" }]
  };

  return (
    <>
      {value == "FormTime" && (
        <>
          <Form
            name="time_related_controls"
            {...formItemLayout}
            // initialValues={{ "date-picker": "2024-01-02" }}
            onFinish={onFinish}
            style={{ maxWidth: 1200 }}
          >
            <Form.Item name="date-picker" label="DatePicker" {...config}>
              <DatePicker />
            </Form.Item>
            <Form.Item name="date-time-picker" label="DatePicker[showTime]" {...config}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item name="month-picker" label="MonthPicker" {...config}>
              <DatePicker picker="month" />
            </Form.Item>
            <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
              <RangePicker />
            </Form.Item>
            <Form.Item name="range-time-picker" label="RangePicker[showTime]" {...rangeConfig}>
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item name="time-picker" label="TimePicker" {...config}>
              <TimePicker />
            </Form.Item>
            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};

export default App;
