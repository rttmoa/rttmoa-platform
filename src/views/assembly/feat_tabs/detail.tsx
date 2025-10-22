/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { Card, Typography } from 'antd';
import { useDispatch } from '@/redux';
import { setTabTitle } from '@/redux/modules/tabs';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const { Title } = Typography;

const TabsDetail: React.FC = () => {
	const location = useLocation();
	// console.log(location);

	// 1、URL 参数
	// 定义路由 <Route path="/users/:id" component={UserComponent} />
	// 在组件中获取参数 const { id } = useParams();
	const { id } = useParams(); // 获取匹配的 iD：`/feat/tabs/detail/:id`

	// 2、查询字符串参数
	// 2.1、获取Search传参
	const query = new URLSearchParams(location.search).get('params');
	// 2.2、获取Search传参
	// let [searchParams, setSearchParams] = useSearchParams()
	// console.log("useSearchParams", searchParams.get("params"));
	// console.log("useSearchParams", searchParams.get("pageSize"));

	// 3、状态参数
	// 在路由中传递参数  <Link to={{ pathname: '/users', state: { id: 123 } }}>User</Link>
	// 在组件中获取参数  const { id } = location.state;
	const state = location.state?.name;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTabTitle(`No.${id} - Tab 详情`));
	}, []);

	return (
		<Card>
			<Title level={4}>我是 Tab 详情页</Title>
			<Title level={5}>params：{id}</Title>
			{query && <Title level={5}>query：{query}</Title>}
			{state && <Title level={5}>state：{state}</Title>}
		</Card>
	);
};

export default TabsDetail;
