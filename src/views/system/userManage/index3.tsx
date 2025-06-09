import React, { useEffect, useState } from 'react';
import { Card, message, Modal, Form, Pagination } from 'antd';
import MultiTable from '@/components/Tables';
import UserFormModal from './components/UserFormModal';
import { newFormList } from './components/Form_Config';
import { selectdProps } from '@/components/SelectFilter';
import useExportExcle from '@/hooks/useExportExcle';
import './index.less';
import { columnConfig } from './components/Table_Column_Config';
import TableHeader from './components/TableHeader';
import AdvancedSearchForm from '@/components/AdvancedSearchForm';
import { DelMoreUser, DelUser, GetUserManagerList } from '@/api/modules/upack/common';

interface UserListResults {
	code?: number;
	data: {
		list: [];
		current?: number;
		pageSize?: number;
		total?: number;
		message?: string;
	};
	msg?: string;
}

interface Pagination {
	page: number;
	pageSize: number;
	totalCount?: number;
}

// 完成： 查询参数的处理
// 完成： 1、注意：向后台传递的参数有：表头搜索、表格过滤、表格排序、分页
// 完成： 2、页码和搜索条件变动 去服务端取数据 searchFilter + pagination
// 完成： 弹窗内 Form 的样式 — 使用 AdvancedSearchForm 组件中的 Row、Col组件
// 完成： 如何封装Form、其中input等组件如何传值
// * 列配置
// * 表格和表头的 高度
const UserManage: React.FC = () => {
	const { handleExportAll } = useExportExcle();
	const [form] = Form.useForm();
	const [multiForm] = Form.useForm();

	const [tableY, setTableY] = useState<any>(500);
	console.log('tableY', tableY);
	// * 处理角色
	const [roleObj, setroleObj] = useState<any>({}); // 角色对象： {0: '普通用户', 2: '前端开发', 5: '管理员'}
	const [roleAll, setroleAll] = useState([]); // 所有角色的集合

	// * 表格查询：表单搜索条件
	const [searchFilter, setSearchFilter] = useState({}); // * {user_name: '张三', sex: 2}
	const [filterResult, setfilterResult] = useState<selectdProps>({ state: '1', type: ['1', '3'] });

	// * Table 表格
	const [loading, setLoading] = useState(false);
	const [userList, setUserList] = useState<any>([]);
	const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: 10, totalCount: 0 }); // 分页
	const [selectRowItem, setSelectRowItem] = useState<any>({ selectedRowKeys: [], selectedIds: [], selectedItem: {} });

	// * 处理弹窗
	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalType, setModalType] = useState<string>('');
	const [modalUserInfo, setModalUserInfo] = useState({});

	async function GetData() {
		setLoading(true);
		// console.log('参数 pagination：', pagination)
		let { page, pageSize } = pagination;
		let searchParams = { page, pageSize, ...searchFilter };
		const result: any = await GetUserManagerList(searchParams);
		const userlist = result?.data?.list?.map((item: any, index: number) => ({ ...item, key: index + 1 }));
		setUserList(userlist || []);
		setPagination({
			page: page || 1,
			pageSize: pageSize || 10,
			totalCount: result?.data?.total || 0,
		});
		setLoading(false);
	}
	useEffect(() => {
		GetData();
	}, [pagination.page, pagination.pageSize, searchFilter]);

	// * 操作 — 员工： 新建、编辑、详情、删除  按钮
	const handleOperator = async (type: string, item: any) => {
		// console.log('handleOperator', type, item)
		if (type === 'create') {
			setModalIsVisible(true);
			setModalTitle('新建用户');
			setModalType(type);
			setModalUserInfo({});
		} else if (['edit', 'detail'].includes(type)) {
			setModalIsVisible(true);
			setModalTitle(type === 'edit' ? '编辑用户' : '查看详情');
			setModalType(type);
			setModalUserInfo(item);
		} else if (type === 'delete') {
			// 删除及删除更多操作：只是参数不一致
			// 1、参数传递到后台
			// 2、获取响应结果、提示响应结果
			// 3、重新获取数据
			const result: any = await DelUser(item._id);
			message.success(result.data.message);
			GetData();
		} else if (type === 'moreDelete') {
			const res: any = await DelMoreUser(selectRowItem.selectedIds || []);
			message.success(res.data.message);
			setSelectRowItem({ selectedRowKeys: [], selectedIds: [], selectedItem: {} });
			GetData();
		}
	};
	// * 操作 — 员工： 新建、编辑、详情  弹窗内容提交
	const handleModalSubmit = () => {
		// 1、获取form字段值 并 过滤出有值的字段
		// 2、字段值传递接口、获取接口结果、并提示出信息
		// 3、重置Modal信息
		// 4、重新请求，根据页码等条件
		let type = modalType;
		let formData = form.getFieldsValue();
		console.log('弹窗Modal：', formData);
		// let res = type === 'create' ? createUser(formData) : editUser(formData)

		setModalTitle('');
		setModalType('');
		setModalIsVisible(false);
		setModalUserInfo({});
		message.info('待实现');
	};

	// 导出EXCEL表头
	const header = {
		address: '地址',
		birthday: '生日',
		email: '邮箱',
		id: 'id',
		interest: '爱好',
		isMarried: '婚姻状态',
	};
	// 表头属性
	let TableHeaderConfig = {
		selectRowItem,
		header,
		userList,
		handleOperator,
		handleExportAll,
	};
	const fakeData = true;

	return (
		<div className='flex flex-col flex-1  overflow-hidden'>
			{/* 顶部搜索表单区域，高度固定或动态 */}
			<div className=''>
				{' '}
				{/* shrink-0 */}
				<AdvancedSearchForm
					cid='AdvancedSearchForm'
					loading={loading}
					rowCount={3} // 每行数量
					FormListConfig={newFormList} // Form配置项
					tableYHeight={(data: number) => {
						setTableY(data);
					}}
					// Form表单提交结果：表单是否有参数变化
					FormOnFinish={(filterParams = {}) => {
						const filtered = Object.fromEntries(
							Object.entries(filterParams).filter(([_, value]) => value !== undefined && value !== null && !(typeof value === 'string' && value.trim() === ''))
						);
						// console.log('过滤 filterParams', filtered)
						setSearchFilter(filtered || {});
					}}
				/>
			</div>
			{/* 下部内容（Card + Table），高度自动撑满剩余空间 */}
			<Card
				className='cardTable  mt-2 flex-auto h-[650px]'
				size='small' // size
				hoverable
				loading={false}
				title={<span className='text-[14px]'>用户列表</span>}
				extra={<TableHeader {...TableHeaderConfig} />}
			>
				<MultiTable<any> // Table 👈
					id='cart-scrollTable'
					size='small' // small | default
					loading={loading}
					xScroll
					scroll={{ x: 'max-content', y: tableY }} // 550   '100%'
					sticky={{ offsetHeader: 0 }}
					rowSelection='checkbox' // checkbox | radio
					columns={fakeData ? columnConfig(fakeData, roleObj, handleOperator) : columnConfig()}
					updateSelectedItem={(selectedRowKeys: any, selectedRows: any, selectedIds: any) => {
						setSelectRowItem({
							selectedRowKeys,
							selectedIds: selectedIds && selectedIds.length > 0 ? selectedIds : [],
							selectedRows,
						});
					}}
					updatePage={(page, pageSize) => {
						setPagination((state: Pagination) => ({ ...state, page, pageSize }));
					}}
					dataSource={userList}
					pagination={pagination}
					selectedRowKeys={selectRowItem.selectedRowKeys}
					selectedIds={selectRowItem.selectedIds}
					selectedItem={selectRowItem.selectedItem}
				/>
				{/* <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={() => {}} /> */}
			</Card>

			<Modal
				width={800}
				height={800}
				title={modalTitle}
				open={modalIsVisible}
				onOk={handleModalSubmit}
				onCancel={() => {
					setModalTitle('');
					setModalType('');
					setModalIsVisible(false);
					setModalUserInfo({});
				}}
			>
				<UserFormModal form={form} roles={roleAll} userInfo={modalUserInfo} type={modalType} />
			</Modal>
			{/* <div class="ant-layout css-dev-only-do-not-override-nqoqt9"><header class="ant-layout-header css-dev-only-do-not-override-nqoqt9"> </header>
				<div class="ant-tabs ant-tabs-top ant-tabs-editable ant-tabs-middle ant-tabs-card ant-tabs-editable-card tabs-box css-dev-only-do-not-override-nqoqt9"> </div>
				<main class="ant-layout-content css-dev-only-do-not-override-nqoqt9"><div style="height: 100vh; display: flex; flex-direction: column;"> </div></main>
				<footer class='ant-layout-footer ant-footer css-dev-only-do-not-override-nqoqt9'>
					<a href='#' target='_blank' rel='noreferrer'>
						2025 © Upack By React Hooks Technology.
					</a>
				</footer></div> */}
		</div>
	);
};
export default UserManage;
