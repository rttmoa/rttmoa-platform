import React, { useEffect, useRef, useState } from 'react';
import { message, Modal, Form, Pagination, Card } from 'antd';
import MultiTable from '@/components/Tables';
import UserFormModal from './components/UserFormModal';
import { newFormList } from './components/FormConfig';
import { selectdProps } from '@/components/Abandon/SelectFilter';
import './index.less';
import { columnConfig } from './components/ColumnConfig';
import TableHeader from './components/TableHeader';
import AdvancedSearchForm from '@/components/AdvancedSearchForm';
import { DelMoreUser, delUser, getUsers } from '@/api/modules/system';

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
// 完成： 表格和表头的 高度
// * 列配置
const UserManage: React.FC = () => {
	const [form] = Form.useForm();
	const [multiForm] = Form.useForm();

	const formRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const paginationRef = useRef<HTMLDivElement>(null);
	const toolBarRef = useRef<HTMLDivElement>(null);

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

	const [scrollY, setScrollY] = useState(0);
	const [isExpand, SetIsExpand] = useState(false); // 获取子组件是否展开

	// 表格高度自适应
	useEffect(() => {
		const updateHeight = () => {
			const containerH = containerRef.current?.clientHeight || 0; // 可视区高
			const formH = formRef.current?.clientHeight || 0; // 表单高
			const toolBarH = toolBarRef.current?.clientHeight || 0; // 表单高
			const paginationH = paginationRef.current?.clientHeight || 0; // 分页高
			const tableHeight = containerH - formH - toolBarH - paginationH; // 100 | 120 | 140
			let tableh = tableHeight > 200 ? tableHeight : 200;
			setScrollY(tableh);
		};
		updateHeight();
		window.addEventListener('resize', updateHeight);
		return () => window.removeEventListener('resize', updateHeight);
	}, [isExpand]);

	async function GetData() {
		setLoading(true);
		// console.log('参数 pagination：', pagination)
		let { page, pageSize } = pagination;
		let searchParams = { page, pageSize, ...searchFilter };
		const result: any = await getUsers(searchParams);
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
			const hide = message.loading('正在删除');
			try {
				const result: any = await delUser(item._id);
				if (result) {
					hide();
					GetData();
					message.success(result.data.message);
				}
			} catch (error) {
				hide();
				message.error('删除失败、请再试一次！');
			}
		} else if (type === 'moreDelete') {
			const hide = message.loading('正在删除');
			try {
				const res: any = await DelMoreUser(selectRowItem.selectedIds || []);
				if (res) {
					hide();
					setSelectRowItem({ selectedRowKeys: [], selectedIds: [], selectedItem: {} });
					GetData();
					message.success(res.data.message);
				}
			} catch (error) {
				hide();
				message.error('删除失败、请再试一次！');
			}
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
	const handleExportAll: any = () => {};
	// 表头属性
	let TableHeaderConfig = {
		selectRowItem,
		header,
		userList,
		handleOperator,
		handleExportAll,
	};
	const fakeData = true;

	console.log('总高度：', containerRef?.current?.clientHeight);
	console.log('表单高度: ', formRef.current?.clientHeight);
	console.log('表格高度：', scrollY);
	return (
		<div className='TableCSS' ref={containerRef}>
			<AdvancedSearchForm
				formRef={formRef}
				loading={loading}
				rowCount={3} // 每行数量
				FormListConfig={newFormList} // Form配置项
				// Form表单提交结果：表单是否有参数变化
				FormOnFinish={(filterParams = {}) => {
					const filtered = Object.fromEntries(Object.entries(filterParams).filter(([_, value]) => value !== undefined && value !== null && !(typeof value === 'string' && value.trim() === '')));
					setSearchFilter(filtered || {});
				}}
				SetIsExpand={SetIsExpand}
			/>
			<Card>
				<div className='h-full flex-1  mt-[12px] px-[24px] rounded-lg bg-white'>
					<div className='flex justify-between px-[18px] py-[10px]' ref={toolBarRef}>
						<span className='text-[14px] font-mono'>用户列表</span>
						<TableHeader {...TableHeaderConfig} />
					</div>
					<MultiTable<any> // Table 👈
						id='cart-scrollTable'
						size='small' // small | default
						loading={loading}
						xScroll
						scroll={{ x: 'max-content', y: scrollY }} // 550   '100%'
						// scroll={{ x: 'max-content', y: '100%' }} // 550   '100%'
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
				</div>

				<div className='flex justify-end rounded-lg px-[20px] py-[10px] bg-white' ref={paginationRef}>
					<Pagination
						size='small'
						showQuickJumper
						showSizeChanger
						onChange={(page: number, pageSize: number) => {
							setPagination({ ...pagination, page, pageSize });
						}}
						current={pagination.page}
						pageSize={pagination.pageSize}
						pageSizeOptions={[5, 10, 15, 20, 50, 100, 500, 1000]}
						total={pagination.totalCount}
						showTotal={() => `第 ${pagination.page} 页， 共 ${pagination.totalCount} 条`} // 	第 31-40 条 || 总共 27469 条
					/>
				</div>
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
		</div>
	);
};
export default UserManage;
