import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';
import Config from './config';
import Excel from './Excel';
import { SettingOutlined } from '@ant-design/icons';

const expectedHeaders = ['序号', '学科', '项目名称', '端', '账号', '密码'];

const TableDataImport = () => {
	const [tableLoading, setTableLoading] = useState<boolean>(false); // 加载状态：Loading
	const [fileName, setFileName] = useState<string>(''); // 文件名称： __EXCEL__黑马账号信息.xlsx

	const [dataSource, SetDataSource] = useState<any>([]);
	const [column, SetColumn] = useState([]);

	useEffect(() => {
		SetDataSource(Config().dataSource as any);
		SetColumn(Config().column as any);
	}, []);

	const FakeData = (data: any) => {
		console.log('假数据', data);
		let newData: any = [];
		for (const element of data) {
			newData.push({
				...element,
				序号: element.key,
			});
		}
		SetDataSource([...dataSource, ...newData]);
	};
	return (
		<div className='TableDataImport bg-white px-[24px] h-full'>
			<div className='fileUpDiv '>
				<div className='mr-[40px]'>文件名称：</div>
				<span className='fileName'>{fileName}</span>
				{/* https://ant.design/components/upload-cn#uploadfile */}
				<Excel
					TableName='用户管理'
					setFileName={setFileName}
					ExportTableData={dataSource} // 接口数据：所有表数据
					tableHeaders={column.map((value: any) => value.title)} // 表头数据
					fakeData={FakeData}
				>
					<Button icon={<SettingOutlined className='hover:cursor-pointer' />}>Excel Setting</Button>
				</Excel>
			</div>
			<Table scroll={{ x: '100%', y: 'calc( 100vh - 270px )' }} rowKey={(record: any) => record.key} bordered loading={tableLoading} size='small' dataSource={dataSource} columns={column} />
		</div>
	);
};

export default TableDataImport;
