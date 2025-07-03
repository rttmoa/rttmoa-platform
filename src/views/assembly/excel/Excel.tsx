import { Button, Dropdown, Popconfirm, Tooltip, Upload } from 'antd';
import React, { useState } from 'react';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { message } from '@/hooks/useMessage';
import { IconFont } from '@/components/Icon';
import { DeleteOutlined, EditOutlined, EyeOutlined, QuestionCircleFilled, QuestionCircleTwoTone, QuestionOutlined } from '@ant-design/icons';

// const tableHeaders = ['序号', '学科', '项目名称', '端', '账号', '密码'];

// ! 上传完毕后：还需要记录上传的文件信息（导入表格记录表）
export default function Excel(Props: any) {
	const {
		TableName, // 导出文件名：用户管理
		ExportTableData, // 导出表格数据
		tableHeaders, // 表头名称：['序号', '学科', '项目名称', '端', '账号', '密码'];
	} = Props;
	const [tableLoading, setTableLoading] = useState<boolean>(false); // 加载状态：Loading
	const [fileName, setFileName] = useState<string>(''); // 文件名称： __EXCEL__黑马账号信息.xlsx

	// ! 导入表格数据
	// 参数设置   (file:文件 Blob类型,sheetName:工作区名称 string类型)
	const handleUpload = (file: any) => {
		const isExcel = /\.(xlsx|xls)$/.test(file?.name.toLowerCase());
		if (!isExcel) {
			message.error('请上传Excel文件（.xlsx 或 .xls）');
			return false;
		}
		setFileName(file.name);
		setTableLoading(true);
		const reader = new FileReader(); // 异步读取文件
		reader.onload = (e: any) => {
			const data = new Uint8Array(e.target.result); // 格式化数组
			const workbook = XLSX.read(data, { type: 'array' }); // 读取文件内容
			const worksheet = workbook.Sheets[workbook.SheetNames[0]]; //  ['Sheet1']: 指的是工作区一
			const jsonData: any = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // 将工作表数据转换为 JSON 格式
			console.log('jsonData', jsonData); // ! 这里就是所有的表格数据了
			if (jsonData == 0) {
				message.warning('导入错误：表格无数据');
				setTableLoading(false);
				return false;
			}
			// 验证表头字段
			const headers = jsonData[0] || [];
			const missingHeaders = tableHeaders.filter((h: any) => !headers.includes(h));
			if (missingHeaders.length > 0) {
				message.error(`导入失败：缺少字段：${missingHeaders.join('、')}`);
				return false;
			}
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
			if (tableDataRes.length == 0) {
				message.warning('导入错误：表格无数据');
				setTableLoading(false);
				return false;
			}
			// // 设置表头
			// setColumns(columns);
			// // 设置数据
			// setTableData(tableDataRes);
			// ! 将数据传过去、传至接口中
			// 取消表格加载状态
			setTableLoading(false);
		};
		reader.readAsArrayBuffer(file);
	};

	// * 导出模板
	// ! 传参：expectedHeaders表头信息
	const exportTemplate = () => {
		// const tableHeaders = ['序号', '学科', '项目名称', '端', '账号', '密码'];

		// 1. 构造一个空的 worksheet，只包含表头
		const ws = XLSX.utils.aoa_to_sheet([tableHeaders]);

		// 2. 创建 workbook
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		// 3. 生成并导出
		const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
		const blob = new Blob([wbout], { type: 'application/octet-stream' });

		saveAs(blob, `${TableName}模板.xlsx`);
	};

	// * 导出表格
	const handleExport = () => {
		if (!ExportTableData.length) return message.warning('暂无数据可导出');

		const worksheet = XLSX.utils.json_to_sheet(ExportTableData);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

		const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		const fileBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
		saveAs(fileBlob, `导出${TableName}数据.xlsx`);
	};

	const menuList = [
		{
			key: '1',
			label: (
				<div>
					<Upload
						beforeUpload={file => {
							handleUpload(file);
						}}
					>
						{/* 提示：只导入工作区是 Sheet1 的数据 */}
						<Button key='view' type='text' size='middle' icon={<EyeOutlined />}>
							导入表格数据
							<Tooltip title='向表格中导入数据、先下载模板并导入！'>
								<span>
									<QuestionCircleTwoTone />
								</span>
							</Tooltip>
						</Button>
					</Upload>
				</div>
			),
		},
		{
			key: '2',
			label: (
				<Button key='edit' type='text' size='middle' icon={<EditOutlined />} onClick={exportTemplate}>
					导出表格模板
					<Tooltip title='模板格式、按格式去导入！'>
						<span>
							<QuestionCircleTwoTone />
						</span>
					</Tooltip>
				</Button>
			),
		},
		{
			key: '3',
			label: (
				<Button key='delete' type='text' size='middle' icon={<DeleteOutlined />} onClick={handleExport}>
					导出表格数据
					<Tooltip title='导出表格中所有的数据！'>
						<span>
							<QuestionCircleTwoTone />
						</span>
					</Tooltip>
				</Button>
			),
		},
	];
	return (
		<>
			<Dropdown
				menu={{
					items: menuList,
				}}
				placement='bottom'
				arrow={{ pointAtCenter: true }}
				trigger={['click']}
			>
				<div className='more-button-item'>
					<IconFont style={{ fontSize: 22 }} type='icon-xiala' />
				</div>
			</Dropdown>
		</>
	);
}
