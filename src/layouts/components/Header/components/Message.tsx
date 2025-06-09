import { Badge, Popover, Tabs, Empty } from 'antd';
import type { TabsProps } from 'antd';

interface IconImports {
	[path: string]: () => Promise<{ default: string }>;
}
interface Icons {
	[path: string]: string;
}
// TODO: 处理assets下的图片作为img的src地址
const iconsImports = import.meta.glob('/src/assets/images/notice*.png') as IconImports;
// console.log(import.meta.glob("/src/assets/images/login*.svg"));
// console.log(iconsImports); // {/src/assets/images/notice01.png: ƒ, /src/assets/images/notice02.png: ƒ....}

let icons: Icons = {};

// 遍历对象
for (const path in iconsImports) {
	// console.log(path); // /src/assets/images/notice02.png
	iconsImports[path]().then(module => {
		// console.log(module);
		return (icons[path] = module.default);
	});
}

const Notice: React.FC = () => {
	const noticeList = [
		{ title: '一键三连 UpackAdmin 🧡', icon: 'notice01.png', time: '一分钟前' },
		{ title: '一键三连 UpackAdmin 💙', icon: 'notice02.png', time: '一小时前' },
		{ title: '一键三连 UpackAdmin 💚', icon: 'notice03.png', time: '半天前' },
		{ title: '一键三连 UpackAdmin 💜', icon: 'notice04.png', time: '一星期前' },
		{ title: '一键三连 UpackAdmin 💛', icon: 'notice05.png', time: '一个月前' },
	];

	return (
		<div className='notice-list'>
			{noticeList.map(item => {
				return (
					<div className='notice-item' key={item.title}>
						<img src={icons[`/src/assets/images/${item.icon}`]} alt='' className='notice-icon' />
						<div className='notice-content'>
							<span className='notice-title'>{item.title}</span>
							<span className='notice-time'>{item.time}</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

// ? HeaderRgiht > 消息设置
const Message: React.FC = () => {
	const items: TabsProps['items'] = [
		{
			key: '1',
			label: `通知 (${5})`,
			children: <Notice />,
		},
		{
			key: '2',
			label: `消息 (${0})`,
			children: <Empty className='pt60 pb90' description='暂无消息' />,
		},
		{
			key: '3',
			label: `代办 (${0})`,
			children: <Empty className='pt60 pb90' description='暂无待办' />,
		},
	];

	const content = <Tabs defaultActiveKey='0' size='middle' tabBarGutter={50} className='pr12 pl12' items={items} />;

	return (
		// 气泡卡片：https://ant.design/components/popover-cn
		<Popover placement='bottom' content={content} trigger='click' overlayClassName='message-popover'>
			<Badge size='small' count={3} style={{ color: '#ffffff' }}>
				<i className='iconfont icon-xiaoxi'></i>
			</Badge>
		</Popover>
	);
};
export default Message;
