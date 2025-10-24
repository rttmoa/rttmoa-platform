/* eslint-disable prettier/prettier */
import React, { lazy, Suspense, useEffect } from 'react';
import { Card, Typography, Button, Space, Select, Divider } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectComp from './selectComp';
import './index.less';

export type MyComponentProps = {
	isShow: boolean;
};

// 创建一个映射对象，将组件名称映射到对应的组件
const componentMap = {
	TableBasic: lazy(() => import('./components/tableBasic')),
	TableBasicHigt: lazy(() => import('./components/tableBasicHigt')), // !
	TableSelectCustom: lazy(() => import('./components/tableSelectCustom')),
	TableFilterSort: lazy(() => import('./components/tableFilterSort')),
	TableFilterSearch: lazy(() => import('./components/tableFilterSearch')),
	TableFilterPanel: lazy(() => import('./components/tableFilterPanel')),
	TableAjax: lazy(() => import('./components/tableAjax')),
	TableTreeData: lazy(() => import('./components/tableTreeData')),
	TableFixedHeader: lazy(() => import('./components/tableFixedHeader')),
	TableFixedColumns: lazy(() => import('./components/tableFixedColumns')),
	TableFixedHeaderColumns: lazy(() => import('./components/tableFixedHeaderColumns')),
	TableHiddenColumns: lazy(() => import('./components/tableHiddenColumns')),
	TableGrouping: lazy(() => import('./components/tableGrouping')),
	TableEditCell: lazy(() => import('./components/tableEditCell')),
	TableEditRow: lazy(() => import('./components/tableEditRow')),
	TableSub: lazy(() => import('./components/tableSub')),
	TableEllipsis: lazy(() => import('./components/tableEllipsis')),
	TableVirtual: lazy(() => import('./components/tableVirtual')),
	TableResponsive: lazy(() => import('./components/tableResponsive')),
	TableSticky: lazy(() => import('./components/tableSticky')),
	TableDynamic: lazy(() => import('./components/tableDynamic')),
};

const BasicTable: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	let initValue = location.search ? location.search.split('=')[1] : 'TableBasic';
	const [value, setValue] = React.useState<string>(initValue);

	// 要新添加 ? 自定义表单控件、多表单联动、内联登陆栏、普通登陆框、注册新用户、弹出层中的新建表单、时间类控件、自行处理表单数据
	const handleChange = (value: string) => {
		setValue(value);
		navigate(`/list/basicTable?select=${value}`);
	};

	return (
		<>
			<Card className='mb-[15px]'>
				<Space size={'middle'}>
					<b>基础表格</b> —— <SelectComp handleChange={handleChange} initValue={initValue} />
				</Space>
			</Card>
			<Card className='mb-[15px]'>
				<Suspense fallback={<div>Loading...</div>}>{Object.entries(componentMap).map(([key, Component]) => value === key && <Component key={key} isShow={value === key} />)}</Suspense>
			</Card>
		</>
	);
};
export default BasicTable;
