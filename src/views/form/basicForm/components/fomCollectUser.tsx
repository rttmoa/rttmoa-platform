/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { Card, Typography, Button, Form, Input, Space, DatePicker, InputNumber, Radio, Select } from "antd";
import { message } from "@/hooks/useMessage";

const { RangePicker } = DatePicker;

interface BasicFormProps {
  title: string;
  date: string[];
  goal: string;
  standard: string;
  client: string;
  invites: string;
  weight: number;
  publicType: string;
  publicUsers: string[];
}

const FormCollectUser: React.FC<{ value: string }> = ({ value }) => {
  const [form] = Form.useForm();

  // useEffect(() => {
  // 	console.log("组件开始1");
  // 	return () => { console.log("切换组件，组件销毁1"); }
  // }, [])

  const onReset = () => {
    console.log("form.setFieldsValue", form.setFieldsValue({ title: undefined, date: undefined })); // 设置表单值为空
  };

  // get Form Value
  const onFinish = async (values: BasicFormProps) => {
    message.success("提交的数据为 : " + JSON.stringify(values));
    console.log("表单结果：", values);
  };

  const initialValues: Partial<BasicFormProps> = { weight: 0, publicType: "1" };

  return (
    <>
      {value == "FromCollectUser" && (
        <Card className="basic-form">
          {/* layout: horizontal | inline | vertical */}
          <Form
            name="basic"
            form={form}
            // labelCol={{ span: 8}}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
          >
            <Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题" }]} wrapperCol={{ span: 16 }}>
              <Input placeholder="给目标起个名字" />
            </Form.Item>
            <Form.Item
              label="起止日期"
              name="date"
              rules={[{ required: false, message: "请选择起止日期" }]}
              wrapperCol={{ span: 18 }}
            >
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item label="目标描述" name="goal" rules={[{ required: false, message: "请输入目标描述" }]}>
              <Input.TextArea rows={3} showCount maxLength={100} placeholder="请输入你的阶段性工作目标" />
            </Form.Item>
            <Form.Item label="衡量标准" name="standard" rules={[{ required: false, message: "请输入衡量标准" }]}>
              <Input.TextArea rows={3} showCount maxLength={100} placeholder="请输入衡量标准" />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  客户<span className="optional">（选填）</span>
                </span>
              }
              name="client"
              tooltip="目标的服务对象"
              wrapperCol={{ span: 16 }}
            >
              <Input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  邀评人<span className="optional">（选填）</span>
                </span>
              }
              name="invites"
              wrapperCol={{ span: 16 }}
            >
              <Input placeholder="请直接 @姓名／工号，最多可邀请 5 人" />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  权重<span className="optional">（选填）</span>
                </span>
              }
              name="weight"
              wrapperCol={{ span: 5 }}
            >
              <InputNumber min={0} max={100} precision={0} placeholder="请输入" addonAfter={"%"} />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  {" "}
                  目标公开<span className="optional">（客户、邀评人默认被分享）</span>{" "}
                </span>
              }
              name="publicType"
              wrapperCol={{ span: 16 }}
            >
              <Radio.Group className="mb10">
                <Radio value="1">公开</Radio>
                <Radio value="2">不公开</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
            // wrapperCol={{ offset: 8 }}
            >
              <Space>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
};

export default FormCollectUser;
