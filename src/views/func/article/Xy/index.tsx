import "./index.less";
import { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Divider, Typography, Tag, BackTop, Radio, Space } from "antd";
import { ToolOutlined, FlagFilled, ToolTwoTone, CrownTwoTone } from "@ant-design/icons";

import CodeBlock from "../utils/CodeBlock"; // 格式化代码Markdown
import Gallery from "../utils/gallery"; // 渲染图片Images
import {
  Api,
  I18n,
  Cookie,
  ComponentsHeader,
  ComponentsPicture,
  ComponentsRichText,
  ComponentsRole,
  ComponentsSider,
  ComponentsUser,
  PageAdmin,
  PageCategory,
  PageLogin,
  PageProduct,
  PageUser
} from "./code/index"; // 要被渲染的代码Code

const List: React.FC = () => {
  const { Title, Paragraph, Text } = Typography;
  const [radioValue, setRadioValue] = useState<number>(1); // 单选框的值

  // 引入组件 + 修改属性 + 修改单选框
  const objProps: any = {
    1: Api,
    2: I18n,
    3: Cookie,
    4: ComponentsHeader,
    5: ComponentsPicture,
    6: ComponentsRichText,
    7: ComponentsRole,
    8: ComponentsSider,
    9: ComponentsUser,
    10: PageAdmin,
    11: PageCategory,
    12: PageLogin,
    13: PageProduct,
    14: PageUser
  };

  return (
    <div className="app">
      <div className="card">
        {/* 标题及标签部分 */}
        <Title level={2}>Start</Title>
        <Paragraph>
          <Tag color="red" className="tag">
            Class
          </Tag>
          <Tag color="cyan" className="tag">
            antd3
          </Tag>
          <Tag color="cyan" className="tag">
            redux3
          </Tag>
          <Tag color="cyan" className="tag">
            react-router-dom4
          </Tag>
          <Tag color="cyan" className="tag">
            less2
          </Tag>
          <Tag color="cyan" className="tag">
            webpack3
          </Tag>
          <Tag color="cyan" className="tag">
            echarts
          </Tag>
          <Tag color="cyan" className="tag">
            echarts-for-react
          </Tag>
          <Tag color="cyan" className="tag">
            draftjs-to-html
          </Tag>
        </Paragraph>

        {/* ---------- TODO: 每一个描述内容的盒子 ----------------------------------- */}
        <div className="content">
          <Title level={3}>项目介绍</Title>
          <Divider orientation="left">技术</Divider>
          <Paragraph className="readme">
            <Title level={5}>
              <CrownTwoTone /> React + Nodejs
            </Title>
            <Title level={5}>
              <CrownTwoTone /> Module：js-cookie、i18next、react-i18next、pubsub-js
            </Title>
          </Paragraph>
          <Divider orientation="left">实现功能</Divider>
          <Paragraph className="readme">
            <Title level={5}>
              <ToolTwoTone /> 商品分类管理；一级分类、二级分类
            </Title>
            <Title level={5}>
              <ToolTwoTone /> 商品管理；商品的增删改查
            </Title>
            <Title level={5}>
              <ToolTwoTone /> 用户管理；用户的增删改查
            </Title>
            <Title level={5}>
              <ToolTwoTone /> 角色管理/权限管理；角色查看目录的范围
            </Title>
            <Title level={5}>
              <ToolTwoTone /> Echarts图形图表；柱状图、折线图、饼图
            </Title>
          </Paragraph>
        </div>

        {/* ---------- TODO: 图片画廊 ----------------------------------- */}
        <div className="content">
          <Title level={3}>图片画廊</Title>
          <Divider orientation="left">功能业务</Divider>
          <Gallery url={"/src/resource/Xy/"}></Gallery>
        </div>

        {/* ---------- TODO: 展示代码 ----------------------------------- */}
        <div className="content">
          <Title level={3}>展示代码</Title>
          <Divider orientation="left">功能</Divider>
          <div style={{ display: "flex" }}>
            <div style={{ width: 350 }}>
              <Radio.Group
                value={radioValue}
                onChange={(e: RadioChangeEvent) => {
                  setRadioValue(e.target.value);
                }}
              >
                <Space direction="vertical">
                  <Radio value={1}>api</Radio>
                  <Radio value={2}>i18n</Radio>
                  <Radio value={3}>js-cookie</Radio>
                  <hr />
                  <Radio value={4}>ComponentsHeader</Radio>
                  <Radio value={5}>ComponentsPicture</Radio>
                  <Radio value={6}>ComponentsRichText</Radio>
                  <Radio value={7}>ComponentsRole</Radio>
                  <Radio value={8}>ComponentsSider</Radio>
                  <Radio value={9}>ComponentsUser</Radio>
                  <hr />
                  <Radio value={10}>PageAdmin</Radio>
                  <Radio value={11}>PageCategory</Radio>
                  <Radio value={12}>PageLogin</Radio>
                  <Radio value={13}>PageProduct</Radio>
                  <Radio value={14}>PageUser</Radio>
                </Space>
              </Radio.Group>
            </div>
            <div style={{ width: "100%" }}>
              <CodeBlock language="javascript" code={objProps[radioValue]}></CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
