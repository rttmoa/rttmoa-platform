import "./index.less";
import CodeBlock from "../utils/CodeBlock";
import { Divider, Typography } from "antd";
const { Title, Paragraph, Text, Link } = Typography;

// 参考：https://dzblog.cn/article/60dc33e718dbe9391712042a
const List = () => {
  const code = `
	import React from 'react';
	import CodeBlock from '@/components/CodeBlock';

	export default function BlogPost() {
	const code = '111';

	return (
		<div>
			<CodeBlock language="javascript" code={code} />
		</div>
	);
	}
	`;
  return (
    <div className="app">
      <div className="card">
        <h5 className="intro">Introduction</h5>
        <div className="content">
          <Title level={2}>介绍</Title>
          <Paragraph>
            蚂蚁的企业级产品是一个庞大且复杂的体系。 我们提供完善的设计原则、最佳实践和设计资源文件（<Text code>Sketch</Text> 和{" "}
            <Text code>Axure</Text>），来帮助业务快速设计出高质量的产品原型。
            <Text type="secondary">Ant Design (secondary)</Text>
            <Text type="success">Ant Design (success)</Text>
            <Text type="warning">Ant Design (warning)</Text>
            <Text type="danger">Ant Design (danger)</Text>
          </Paragraph>
          <Paragraph>
            随着商业化的趋势，越来越多的企业级产品对更好的用户体验有了进一步的要求。带着这样的一个终极目标，我们（蚂蚁金服体验技术部）经过大量的项目实践和总结，逐步打磨出一个服务于企业级产品的设计体系
            Ant Design。基于<Text mark>『确定』和『自然』</Text>
            的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于
            <Text strong>更好的用户体验</Text>。
          </Paragraph>
          <Divider />
          <CodeBlock language="javascript" code={code} />
        </div>
      </div>
    </div>
  );
};

export default List;
