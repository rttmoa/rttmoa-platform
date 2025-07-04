import { useRef, useState } from 'react';
import { Button, Drawer } from 'antd';
import { formatDataForProTable } from '@/utils';
import { pagination as paginationConfig } from '@/config/proTable';
import { UserList } from '@/api/interface';
import { FooterToolbar, LightFilter, ModalForm, ProDescriptions, ProFormDatePicker, ProFormText, ProFormTextArea, ProTable } from '@ant-design/pro-components';
import type { ActionType, FormInstance, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import { addRule, removeRule, updateRule } from '@/api/modules/api_useProTable_eg/api';
import UpdateForm from './component/_UpdateForm';
import './index.less';
import TableColumnsConfig, { TableColumnsParams } from './component/Table_Column_Config';
import ToolBarRender from './component/ToolBarRender';
import { GetAllShelf } from '@/api/modules/system/common';

export type FormValueType = {
	target?: string;
	template?: string;
	type?: string;
	time?: string;
	frequency?: string;
} & Partial<UserList>;

// TODO: refer： https://github.com/ant-design/ant-design-pro
// ProTable：https://procomponents.ant.design/components/table
const useProTable = () => {
	const actionRef = useRef<ActionType>();
	const formRef = useRef<FormInstance>();
	const [createModalOpen, handleModalOpen] = useState<boolean>(false);
	const [selectedRowsState, setSelectedRows] = useState<UserList[]>([]); // 表格：选择行数据
	const [currentRow, setCurrentRow] = useState<UserList>();
	const [showDetail, setShowDetail] = useState<boolean>(false);
	const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
	const [pagination, setPagination] = useState<any>({}); // 分页数据

	// TODO:
	// 设置 页码值的 useState
	// 设置 搜索条件的 useState
	// useEffect 监听值的变化去请求服务端

	const quickSearch = () => {};

	/**
	 * @en-US Add node
	 * @zh-CN 添加节点
	 * @param fields
	 */
	const handleAdd = async (fields: UserList) => {
		const hide = message.loading('正在添加');
		try {
			await addRule({ ...fields });
			hide();
			message.success('Added successfully');
			return true;
		} catch (error) {
			hide();
			message.error('Adding failed, please try again!');
			return false;
		}
	};

	/**
	 * @en-US Update node
	 * @zh-CN 更新节点
	 *
	 * @param fields
	 */
	const handleUpdate = async (fields: FormValueType) => {
		const hide = message.loading('Configuring');
		try {
			await updateRule({
				// name: fields.name,
				// desc: fields.desc,
				// key: fields.key,
			});
			hide();

			message.success('Configuration is successful');
			return true;
		} catch (error) {
			hide();
			message.error('Configuration failed, please try again!');
			return false;
		}
	};

	/**
	 *  Delete node
	 * @zh-CN 删除节点
	 *
	 * @param selectedRows
	 */
	const handleRemove = async (selectedRows: UserList[]) => {
		const hide = message.loading('正在删除');
		if (!selectedRows) return true;
		try {
			await removeRule({
				key: selectedRows.map(row => row.id),
			});
			hide();
			message.success('Deleted successfully and will refresh soon');
			return true;
		} catch (error) {
			hide();
			message.error('Delete failed, please try again');
			return false;
		}
	};

	// * 表头：新建按钮
	let ToolBarParams = {
		handleModalOpen, // 表头新建按钮
		quickSearch, // 表头快捷搜索
	};
	// * 表格列配置
	let TableColumnParams: TableColumnsParams = {
		setCurrentRow,
		setShowDetail,
	};

	// & 表格封装成通用
	return (
		<>
			<ProTable<UserList>
				rowKey='_id'
				scroll={{ y: '100vh' }}
				bordered={true}
				cardBordered
				className='ant-pro-table-scroll'
				columns={TableColumnsConfig(TableColumnParams)}
				// dataSource={[]}
				actionRef={actionRef} // Table action 的引用，便于自定义触发      actionRef.current.reload()  |  actionRef.current.reset()   |   actionRef.current.clearSelected()
				formRef={formRef} // 可以获取到查询表单的 form 实例
				// polling={2000} // 是否轮询
				// params={{
				// 	current: pagination.page,
				// 	pageSize: pagination.pageSize,
				// }} // 用于 request 查询的额外参数，一旦变化会触发重新加载、比如表单的变化
				onSubmit={params => {
					console.log('onSubmit', params);
				}} // 提交表单时触发
				onReset={() => {}} // 重置表单时触发
				pagination={{
					...paginationConfig,
					pageSizeOptions: [10, 20, 50, 100, 500, 1000, 5000],
					onChange: (page, pageSize) => {
						console.log('page, pageSize', page, pageSize);
						setPagination({ page, pageSize });
					},
				}}
				request={async (params, sort, filter) => {
					console.log('request - params', params);
					// console.log('request - sort', sort)
					// console.log('request - filter', filter)
					// const { data } = await getUserList(params)
					// console.log('api === request == data', data)
					// return formatDataForProTable<UserList>(data)
					const { data }: any = await GetAllShelf(params);
					console.log('请求数据：', data);
					return formatDataForProTable<UserList>(data);
				}}
				rowSelection={{
					onChange: (_, selectedRows) => {
						setSelectedRows(selectedRows);
					},
				}}
				ghost={false}
				dateFormatter='string'
				headerTitle='仓库货架表'
				search={{ labelWidth: 'auto', filterType: 'query', span: 6 }} // 搜索表单配置 Form
				toolBarRender={() => ToolBarRender(ToolBarParams)} // 渲染工具栏
				defaultSize='small' // 尺寸：紧凑、中等、宽松
				onSizeChange={() => {}} // Table 尺寸发生改变、将尺寸存储到数据库中
				onRequestError={(error: any) => {}} // 数据加载失败时触发
				editable={{ type: 'multiple' }}
				columnsState={{
					// 持久化列的 key，用于判断是否是同一个 table
					persistenceKey: 'use-pro-table-key',
					// 持久化列的类型: localStorage | sessionStorage
					persistenceType: 'localStorage',
				}}
			/>

			{selectedRowsState?.length > 0 && (
				<FooterToolbar
					extra={
						<div className='font-mono'>
							已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项 &nbsp;&nbsp;&nbsp;&nbsp;
							<span>
								总数为 <span className='text-red-600'>{selectedRowsState.reduce((pre, item) => pre + item.age!, 0)}</span> 岁
							</span>
						</div>
					}
				>
					<Button
						onClick={async () => {
							await handleRemove(selectedRowsState);
							setSelectedRows([]);
							actionRef.current?.reloadAndRest?.();
						}}
					>
						批量删除
					</Button>
					<Button type='primary'>批量批准</Button>
				</FooterToolbar>
			)}

			<ModalForm
				title='新建'
				width='400px'
				open={createModalOpen}
				onOpenChange={handleModalOpen}
				onFinish={async value => {
					const success = await handleAdd(value as UserList);
					if (success) {
						handleModalOpen(false);
						if (actionRef.current) {
							actionRef.current.reload();
						}
					}
				}}
			>
				<ProFormText
					rules={[
						{
							required: true,
							message: 'Rule name is required',
						},
					]}
					width='md'
					name='name'
				/>
				<ProFormTextArea width='md' name='desc' />
			</ModalForm>

			<UpdateForm
				onSubmit={async value => {
					message.info('成功，，，');
					const success = await handleUpdate(value);
					if (success) {
						handleUpdateModalOpen(false);
						setCurrentRow(undefined);
						if (actionRef.current) {
							actionRef.current.reload();
						}
					}
				}}
				onCancel={() => {
					message.info('取消，，，');
					handleUpdateModalOpen(false);
					if (!showDetail) {
						setCurrentRow(undefined);
					}
				}}
				updateModalOpen={updateModalOpen}
				values={currentRow || {}}
			/>
			<Drawer
				width={600}
				open={showDetail}
				onClose={() => {
					setCurrentRow(undefined);
					setShowDetail(false);
				}}
				closable={false}
			>
				{currentRow?.username && (
					<ProDescriptions<UserList>
						column={2}
						title={currentRow?.username}
						request={async () => ({
							data: currentRow || {},
						})}
						params={{
							id: currentRow?.username,
						}}
						columns={TableColumnsConfig(TableColumnParams) as ProDescriptionsItemProps<UserList>[]}
					/>
				)}
			</Drawer>
		</>
	);
};

export default useProTable;
