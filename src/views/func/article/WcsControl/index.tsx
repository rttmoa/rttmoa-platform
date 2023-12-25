import "./index.less";
import { HtmlHTMLAttributes, useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Divider, Typography, Tag, BackTop, Radio, Space } from "antd";
import { ToolOutlined,FlagFilled,ToolTwoTone,CrownTwoTone } from '@ant-design/icons';
 

const List: React.FC = () => {
	const { Title, Paragraph, Text } = Typography;
	const [radioValue, setRadioValue] = useState<number>(1); // 单选框的值

	 useEffect(() => {
		const loc_1054  = document.getElementsByClassName("loc_1054")
		console.log(loc_1054);
		// loc_1053[0].innerHTML = "222" 
		// loc_1054[0]['style'].backgroundColor = "green"
	 }, [])

	return (
		<div className="app">
			<div className="card">

				{/* 标题及标签部分 */}
				<Title level={2}>仓储控制出入库管理实时查看</Title>
				<Paragraph style={{marginLeft: 30}}>
					<Tag color="red" className="tag">环穿</Tag>
					<Tag color="cyan" className="tag">输送线</Tag>
					<Tag color="cyan" className="tag">堆垛机</Tag> 
				</Paragraph>


				{/* ---------- TODO: 每一个描述内容的盒子 ----------------------------------- */}
				<div className="content">
					<div className="stacker1"></div>
					<div className="small loc_1053">1053</div>
					<div className="small loc_1054">1054</div>

				</div>

 
  
			</div>
		</div>
	);
};

export default List;
