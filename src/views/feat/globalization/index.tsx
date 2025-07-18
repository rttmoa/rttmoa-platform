import React from 'react';
import type { RadioChangeEvent, TableColumnsType } from 'antd';
import { Card, DatePicker, Divider, Pagination, Radio, Space, Table, TimePicker, Transfer, Typography } from 'antd';
import { RootState, useDispatch, useSelector } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;
const { RangePicker } = DatePicker;

interface DataType {
	title?: string;
	dataIndex?: string;
}
const columns: any = [
	{ title: 'Name', dataIndex: 'name' },
	{ title: 'Age', dataIndex: 'age' },
];

const Globalization: React.FC = () => {
	const { t } = useTranslation();

	const dispatch = useDispatch();

	const language = useSelector((state: RootState) => state.global.language);

	const changeLocale = (e: RadioChangeEvent) => {
		dispatch(setGlobalState({ key: 'language', value: e.target.value }));
	};

	return (
		<Card className='w-full h-full'>
			<span className='mr10'>Change locale of components :</span>
			<Radio.Group value={language} onChange={changeLocale} buttonStyle='solid'>
				<Radio.Button key='en' value={'en'}>
					English
				</Radio.Button>
				<Radio.Button key='zh' value={'zh'}>
					中文
				</Radio.Button>
			</Radio.Group>

			<Divider />

			<Text>{t('home.welcome')}</Text>

			<Divider />

			<Space direction='vertical' size={[0, 16]} style={{ width: '100%' }}>
				<Pagination defaultCurrent={1} total={60} showSizeChanger />
				<Space wrap>
					<DatePicker />
					<TimePicker />
					<RangePicker />
				</Space>
				<Transfer dataSource={[]} showSearch targetKeys={[]} />
				<Table dataSource={[{ name: 'zhangsan', age: 1 }]} columns={columns} />
			</Space>
		</Card>
	);
};

export default Globalization;
