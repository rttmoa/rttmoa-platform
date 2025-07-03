import { Button, Input, message, Select, Table, Upload } from 'antd';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './index.less';
import Config from './config';
import { saveAs } from 'file-saver';

interface sheetNamesSelectType {
	label: string;
	value: string;
}
const expectedHeaders = ['序号', '学科', '项目名称', '端', '账号', '密码'];

const TableDataImport = () => {
	// 需要的
	const [tableData, setTableData] = useState<any>(Config().dataSource); // 表格数据：最终结果 tableDataRes
	const [tableLoading, setTableLoading] = useState<boolean>(false); // 加载状态：Loading
	const [fileName, setFileName] = useState<string>(''); // 文件名称： __EXCEL__黑马账号信息.xlsx

	const [sheetNames, setSheetNames] = useState<sheetNamesSelectType[]>([]); // 工作表列表；[{ label: 'Sheet1', value: 'Sheet1' }, {label: 'Sheet2', value: 'Sheet2'}];
	const [defaultSheetName, setDefaultSheetName] = useState<string>(''); // 默认工作表

	const [columns, setColumns] = useState<any[]>(Config().column); // 列 表头
	const [tableFile, setTableFile] = useState<Blob>(); // 正在上传的文件：file

	// ! 导入表格数据
	// 参数设置   (file:文件 Blob类型,sheetName:工作区名称 string类型)
	const handleUpload = (file: Blob, sheetName?: string) => {
		// 只要该调用当前方法就清空数据重新渲染
		// setColumns([]);
		// setTableData([]);
		if (!sheetName) {
			// 将默认工作区名称设为空
			setDefaultSheetName('');
		}
		// 表格加载状态
		setTableLoading(true);
		// 异步读取文件
		const reader = new FileReader();
		reader.onload = (e: any) => {
			// 格式化数组
			const data = new Uint8Array(e.target.result);
			// 读取文件内容
			const workbook = XLSX.read(data, { type: 'array' });
			// 如果指定了 sheetName，则将其用于查找工作表；否则，使用默认的第一个工作表。
			// * SheetNames: ['Sheet1']  指的是工作区一
			const worksheet = sheetName ? workbook.Sheets[sheetName] : workbook.Sheets[workbook.SheetNames[0]];
			// 将工作表数据转换为 JSON 格式
			const jsonData: any = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
			console.log('jsonData', jsonData); // ! 这里就是所有的表格数据了
			// 将工作区转为options需要的格式
			const newSheetNames = workbook.SheetNames.map(item => ({ label: item, value: item }));
			console.log('工作区：', newSheetNames); // [{ label: 'Sheet1', value: 'Sheet1' }, {label: 'Sheet2', value: 'Sheet2'}];

			const headers = jsonData[0] || [];

			// 验证表头字段 【少一列提示、多一列提示吗？】
			const missingHeaders = expectedHeaders.filter(h => !headers.includes(h));
			if (missingHeaders.length > 0) {
				message.error(`导入失败，缺少字段：${missingHeaders.join('、')}`);
				return false;
			}

			// const content = jsonData.slice(1).map((row: { [x: string]: any }, idx: any) => {
			// 	return {
			// 		key: idx,
			// 		姓名: row[headers.indexOf('姓名')],
			// 		年龄: row[headers.indexOf('年龄')],
			// 		性别: row[headers.indexOf('性别')],
			// 	};
			// });
			// console.log('这个是?', content);
			// setTableData(content);

			// 保存工作区
			setSheetNames(newSheetNames);
			// 设置默认工作区
			setDefaultSheetName(sheetName ? sheetName : newSheetNames[0].value); // Sheet1
			// 判断所选工作区的内容是否为空
			if (jsonData.length > 0) {
				const tableDataRes: any[] = [];
				// 第一行默认认为是表头 除开第一行以外都是数据
				jsonData.slice(1).forEach((item: any, itemIndex: number) => {
					if (item.length === 0) return false;
					const obj: any = { key: itemIndex };
					jsonData[0].forEach((header: any, index: any) => {
						obj[header] = item[index];
					});
					tableDataRes.push(obj);
				});
				console.log('tableData', tableDataRes); // ! 最终表格数据
				// // 将第一行转为表头
				// const columns = jsonData[0].map((header: any) => ({
				// 	title: header,
				// 	dataIndex: header,
				// 	key: header,
				// 	align: 'center',
				// 	// 以input格式渲染可以对导入的数据进行编辑  如果不需要此功能可以将render删除 也就不用changeTableData方法了
				// 	render: (text: any, record: any, renderIndex: any) => (
				// 		<Input
				// 			key={renderIndex}
				// 			style={{ color: '#000', height: '100%', textAlign: 'center' }}
				// 			// bordered={false}
				// 			defaultValue={text}
				// 			onBlur={eee => {
				// 				changeTableData(eee.target.value, renderIndex, header, tableDataRes);
				// 			}}
				// 		/>
				// 	),
				// }));
				// // 设置表头
				// setColumns(columns);
				// // 设置数据
				// setTableData(tableDataRes);
			} else {
				console.log('没数据');
				message.warning('表格无数据');
			}
			// 取消表格加载状态
			setTableLoading(false);
		};
		reader.readAsArrayBuffer(file);
	};

	// // 需要参数    value:输入框输入的值   index:下标索引    key:表头对应字段     allData:表格中的数据
	// const changeTableData = (value: string, index: any, key: any, allData: any) => {
	// 	const newTableData = JSON.parse(JSON.stringify(allData));
	// 	newTableData[index][key] = value;
	// 	setTableData(newTableData);
	// };

	//  4、导入方法（tableDataImport）。作用：将最终数据进行保存数据库
	const tableDataImport = () => {
		console.log('tableData', tableData);
	};

	// 需要参数  value:工作区   【切换工作区】
	const handleChange = (value: string) => {
		// 调用数据渲染的方法 传入文件以及工作区
		if (tableFile) handleUpload(tableFile, value);
	};
	console.log('columns', columns);
	console.log(tableData);

	// * 导出模板
	// ! 传参：expectedHeaders表头信息
	// ! 传参：名称：用户管理
	const exportTemplate = () => {
		const expectedHeaders = ['序号', '学科', '项目名称', '端', '账号', '密码'];

		// 1. 构造一个空的 worksheet，只包含表头
		const ws = XLSX.utils.aoa_to_sheet([expectedHeaders]);

		// 2. 创建 workbook
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		// 3. 生成并导出
		const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
		const blob = new Blob([wbout], { type: 'application/octet-stream' });

		saveAs(blob, '用户管理模板.xlsx');
	};

	// * 导出表格
	// ! 传参：tableData
	// ! 传参：名称：用户管理
	const handleExport = () => {
		if (!tableData.length) return message.warning('暂无数据可导出');

		const worksheet = XLSX.utils.json_to_sheet(tableData);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

		const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		const fileBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
		saveAs(fileBlob, '导出用户管理数据.xlsx');
	};

	return (
		<div className='TableDataImport bg-white p-[24px]'>
			<div className='fileUpDiv mb-5' style={{ marginTop: 0, marginBottom: 40 }}>
				<span style={{ marginRight: 42 }}>文件名称</span>
				<span className='fileName'>{fileName}</span>

				<Upload
					beforeUpload={file => {
						const isExcel = /\.(xlsx|xls)$/.test(file.name.toLowerCase());
						if (!isExcel) {
							message.error('请上传Excel文件（.xlsx 或 .xls）');
							return false;
						}
						// 文件名称选工作区的时候并不会改变
						setFileName(file.name);
						// 保存上传的文件
						setTableFile(file);
						// 调用数据渲染的方法
						handleUpload(file);
						return false;
					}}
				>
					<Button>上传Excel文件</Button>
				</Upload>

				<span style={{ marginRight: 26 }}>选择工作区</span>
				{!defaultSheetName && <Select disabled style={{ width: 120 }} options={[]} />}
				{defaultSheetName && <Select defaultValue={defaultSheetName} style={{ width: 120 }} onChange={handleChange} options={sheetNames} />}

				<Button type='primary' onClick={tableDataImport}>
					导入表格数据
				</Button>
				<Button type='primary' onClick={exportTemplate}>
					导出表格模板
				</Button>
				<Button type='primary' onClick={handleExport}>
					导出表格数据
				</Button>
			</div>
			<Table
				// style={{ height: '100%' }}
				scroll={{ x: '100%', y: 'calc( 100vh - 270px )' }}
				rowKey={record => record.key}
				bordered
				loading={tableLoading}
				size='small'
				dataSource={tableData}
				columns={columns}
			/>
		</div>
	);
};

export default TableDataImport;
