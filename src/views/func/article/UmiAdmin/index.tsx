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
              <CrownTwoTone /> React + Mock
            </Title>
            {/* <Title level={5}><CrownTwoTone />  Module：js-cookie、i18next、react-i18next、pubsub-js</Title> */}
          </Paragraph>
          <Divider orientation="left">实现功能</Divider>
          <Paragraph className="readme">
            <Title level={5}>
              <ToolTwoTone /> 首页布局：侧边+头部+内容+底部
            </Title>
            <Title level={5}>
              <ToolTwoTone /> 权限管理：普通用户和管理员看到的界面不同
            </Title>
            <Title level={5}>
              <ToolTwoTone /> 用户管理；用户的增删改查
            </Title>
            <Title level={5}>
              <ToolTwoTone /> 文章管理：文章发布状态；未发布，已发布
            </Title>
            <Title level={5}>
              <ToolTwoTone /> Request：标签；get，post，patch，delete 可添加参数，发送请求获取数据
            </Title>
            <Title level={5}>
              <ToolTwoTone /> 文本域：Editor编辑器转换HTML、MarkDown、JSON格式数据
            </Title>
            <Title level={5}>
              <ToolTwoTone /> Echarts：下面图片展示 Echarts、HighCharts、Recharts三种npm包
            </Title>
          </Paragraph>
          <Divider orientation="left">其他功能</Divider>
          <Paragraph className="readme">
            <ul>
              <li>路由处理：界面参数会添加到地址栏中去</li>
              <li>使用dvajs状态管理</li>
              <li>使用umi需要配置文件 umirc.js</li>
              <li>使用umi中ES7语法： @connect((loading, dispathc)) {"=>"} ()</li>
              <li>Components封装了一些公共组件</li>
              <li>Layout布局的封装格式</li>
              <li>page各界面下组件的写法，代码格式，书写规范</li>
              <li>utils下封装了一些工具类</li>
              <li>头部：使用国际化locales中英葡、通知组件、用户信息</li>
              <li>侧边：处理侧边栏菜单、切换侧边栏主题颜色</li>
            </ul>
          </Paragraph>
        </div>

        {/* ---------- TODO: 图片画廊 ----------------------------------- */}
        <div className="content">
          <Title level={3}>图片画廊</Title>
          <Divider orientation="left">功能业务</Divider>
          <Gallery url={"/src/resource/UmiAdmin/"}></Gallery>
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
