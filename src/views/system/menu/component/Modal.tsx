import { Button, Card, Col, Form, Input, InputNumber, Modal, Radio, Row, Select, TreeSelect } from 'antd';
import { useEffect, useState } from 'react';
import useEnterSubmit from '@/hooks/useTable/useEnterSubmit';
import { menu } from './menuConfig';
import { SettingTwoTone } from '@ant-design/icons';
import { Icon } from '@/components/Icon';
import * as Icons from '@ant-design/icons';

const ModalComponent = (Props: any) => {
	const { form, menuOpen, modalTitle, modalType: type, modalIsVisible, modalSubMenu, modalMenuInfo: data, setModalIsVisible, handleModalSubmit } = Props;

	const [isTop, setIsTop] = useState('是');
	const [value, setValue] = useState<string>('');
	const [menuType, SetmenuType] = useState('目录');
	const [iconVisibel, setIconVisibel] = useState(false);

	useEnterSubmit(modalIsVisible, () => form.submit()); // * 回车提交表单数据

	// console.log('data?.parent_id', data?.parent_id);

	useEffect(() => {
		form.setFieldsValue({
			isTop: type === 'create' ? '是' : data?.parent_id == 0 ? '是' : '否',
			parent_id: type === 'create' ? null : data?.parent_id == 0 ? null : data?.parent_id,
			path: type === 'create' ? null : data.path,
			element: type === 'create' ? null : data.element,
			redirect: type === 'create' ? null : data.redirect,
			type: type === 'create' ? '目录' : data.meta?.type,
			key: type === 'create' ? null : data.meta?.key,
			title: type === 'create' ? null : data.meta?.title,
			icon: type === 'create' ? 'AppstoreOutlined' : data.meta?.icon,
			sort: type === 'create' ? 1 : data.meta?.sort || 1,
			isLink: type === 'create' ? null : data?.meta?.isLink,
			isHide: type === 'create' ? '否' : data?.meta?.isHide == 1 ? '是' : '否',
			isFull: type === 'create' ? '否' : data?.meta?.isFull == 1 ? '是' : '否',
			isAffix: type === 'create' ? '否' : data?.meta?.isAffix == 1 ? '是' : '否',
			enable: type === 'create' ? '开启' : data?.meta?.enable || '开启',
			is_open_all: null,
		});

		setIsTop(type === 'create' ? '是' : data?.parent_id == 0 ? '是' : '否');
		setValue(type === 'create' ? '' : data?.parent_id == 0 ? null : data?.parent_id);
		if (type == 'createSubMenu') {
			// ! 设置子菜单、其他项应该是空
			// ! 是否顶级部门 ？？？？
			// 其他字段设置应该为 create 一样
			form.setFieldsValue({ parent_id: modalSubMenu });
			setIsTop('否');
			setValue(modalSubMenu);
		}
	}, [type, data]);

	// * 处理菜单结构：递归
	const handleMenu = (menuConfig: any, type: string) => {
		return menuConfig?.map((item: any) => {
			const option: any = {
				value: item.meta?.key,
				label: item.meta?.title,
			};
			if (item.children && item.children.length) {
				option.children = handleMenu(item.children, 'children');
			}
			return option;
		});
	};
	const treeData = handleMenu(menuOpen, '');

	const FormOnFinish = () => {
		const formList = form.getFieldsValue();
		formList.isTop = isTop; // 是否 是顶级上级
		if (isTop == '是') formList.parent_id = 0; // 父 id
		if (isTop == '否') formList.parent_id = value;
		if (type == 'edit') {
			formList._id = data.unique;
		}
		// console.log('parent_id', isTop, '+', formList.parent_id);
		// console.log('is_open_all', formList.is_open_all);
		// return;
		handleModalSubmit && handleModalSubmit(type, formList);
	};

	const iconNames: any = [];
	Object.keys(Icons).forEach(key => {
		if (key.endsWith('Outlined')) {
			iconNames.push(key);
		}
	});

	const CancleButton: any = (
		<Button danger loading={false} onClick={() => setModalIsVisible(false)}>
			取消
		</Button>
	);
	const SubmitButton: any = (
		<Button key='link' type='primary' loading={false} onClick={() => form.submit()}>
			提交
		</Button>
	);
	return (
		<>
			<Modal title={modalTitle} width={950} loading={false} open={modalIsVisible} onCancel={() => setModalIsVisible(false)} footer={[CancleButton, SubmitButton]}>
				<Form className='mt-[40px] mb-[50px] px-[20px] max-h-[650px] overflow-auto' layout='vertical' size='middle' form={form} onFinish={FormOnFinish}>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>是否顶级部门</span>} name='isTop' rules={[{ required: true, message: '' }]}>
								<Radio.Group
									options={['是', '否']}
									defaultValue='是'
									onChange={(item: any) => {
										setIsTop(item.target.value);
									}}
									value={isTop}
								/>
							</Form.Item>
						</Col>
						{isTop == '否' && (
							<Col span={12} pull={0}>
								<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>上级部门</span>} name='parent_id' rules={[{ required: true, message: '必须：上级部门' }]}>
									<TreeSelect
										style={{ width: '100%' }}
										value={value}
										variant='filled'
										placeholder='请选择上级部门'
										allowClear
										onChange={newValue => {
											setValue(newValue);
										}}
										treeData={treeData}
										dropdownStyle={{ maxHeight: 500, overflow: 'auto' }}
										className='custom-tree-dropdown'
									/>
								</Form.Item>
							</Col>
						)}
						<Col span={24} pull={0}>
							<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>菜单类型</span>} name='type' rules={[{ required: true, message: '创建菜单需 type' }]}>
								<Radio.Group
									buttonStyle='solid'
									options={['目录', '菜单', '按钮']}
									defaultValue='目录'
									onChange={(item: any) => {
										SetmenuType(item.target.value);
									}}
									value={menuType}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								className='!mb-[8px]'
								label={<span className='text-[12px]'>菜单图标</span>}
								name='icon'
								tooltip={
									<a href='https://ant.design/components/icon-cn' target='_blank'>
										ant-icon 🚀
									</a>
								}
								rules={[{ required: true, message: '创建菜单需 图标' }]}
							>
								<Input
									disabled
									addonBefore={
										<SettingTwoTone
											style={{ fontSize: 18 }}
											onClick={() => {
												setIconVisibel(true);
											}}
										/>
									}
									placeholder='点击设置选择图标'
								/>
							</Form.Item>
						</Col>
						<Col>
							<Form.Item />
						</Col>
						<Col span={12}>
							<Form.Item
								className='!mb-[8px]'
								label={<span className='text-[12px]'>菜单路由路径</span>}
								name='path'
								tooltip={{ title: '路由路径必须填写' }}
								rules={[{ required: true, message: '地址栏中的路由路径 path' }]}
							>
								<Input placeholder='path: /home/index' />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>菜单组件路径</span>} name='element' tooltip={{ title: '代码写到哪个文件夹的路径' }}>
								<Input placeholder='element: /home/index' />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item />
						</Col>
						{menuType == '目录' ? (
							<Col span={12}>
								<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>重定向路径</span>} name='redirect' tooltip={{ title: '目录中的菜单有重定向功能' }}>
									<Input placeholder='redirect: /author/page' />
								</Form.Item>
							</Col>
						) : (
							<Col span={12}>
								<Form.Item />
							</Col>
						)}
						<Col span={12}>
							<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>菜单唯一标识</span>} name='key' rules={[{ required: true, message: '创建菜单需 key' }]}>
								<Input placeholder='home' />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>菜单标题</span>} name='title' rules={[{ required: true, message: '创建菜单需 title' }]}>
								<Input placeholder='首页' />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>外链URL</span>} name='isLink'>
								<Input placeholder='外链链接地址 eg：www.baidu.com' />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>是否隐藏菜单项</span>} name='isHide' rules={[{ required: true, message: '创建菜单需 isHide' }]}>
								<Radio.Group options={['是', '否']} defaultValue='否' />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>是否全屏显示</span>} name='isFull' rules={[{ required: true, message: '创建菜单需 isFull' }]}>
								<Radio.Group options={['是', '否']} defaultValue='否' />
							</Form.Item>
						</Col>

						<Col span={12}>
							<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>是否固定标签页</span>} name='isAffix' rules={[{ required: true, message: '创建菜单需 isAffix' }]}>
								<Radio.Group options={['是', '否']} defaultValue='否' />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>显示排序</span>} name='sort' tooltip={{ title: '最小值：1、最大值：999、数值小排在前面' }}>
								<InputNumber controls min={1} max={99999999} defaultValue={1} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>是否启用菜单</span>} name='enable' rules={[{ required: true, message: '创建菜单需 enable' }]}>
								<Radio.Group options={['开启', '关闭']} defaultValue='开启' />
							</Form.Item>
						</Col>
						{type == 'edit' && data?.parent_id == 0 && (
							<>
								<Col span={12}></Col>
								<Col span={12}>
									<Form.Item
										className='!mb-[8px]'
										label={<span className='text-[12px]'>是否开启全部</span>}
										name='is_open_all'
										rules={[{ required: false, message: '创建菜单需 enable' }]}
										tooltip={{ title: '当前菜单和所有当前菜单的子菜单全部 关闭/开启' }}
									>
										<Select
											placeholder='请选择开启 开启全部菜单 / 关闭全部菜单 (默认不用选)'
											options={[
												{ value: '开启全部菜单', label: '开启全部菜单' },
												{ value: '关闭全部菜单', label: '关闭全部菜单' },
											]}
										/>
									</Form.Item>
								</Col>
							</>
						)}
					</Row>
					<Card className='mt-[25px]' title={<span className='text-[14px]'>菜单结构 JSON 数据、参考如何创建菜单</span>} bodyStyle={{ height: 400, overflow: 'auto' }}>
						<pre style={{ backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '6px', overflow: 'auto', fontSize: 13 }}>
							<code>{JSON.stringify(menu, null, 2)}</code>
						</pre>
					</Card>
				</Form>
			</Modal>
			{/* 这个Modal要放下面、否则层级低、显示不出来 */}
			<Modal
				className='search-modal'
				open={iconVisibel}
				onCancel={() => {
					setIconVisibel(false);
				}}
				footer={null}
				width={600}
			>
				<div className='flex flex-row flex-wrap justify-evenly max-h-[650px] overflow-y-auto my-[30px]'>
					{iconNames.map((name: any) => {
						const IconComp = (Icons as any)[name];
						return (
							<div
								className='text-center cursor-pointer w-[120px] h-[85px]'
								key={name}
								onClick={() => {
									form.setFieldsValue({ icon: name });
									setIconVisibel(false);
								}}
							>
								<Icon name={name} style={{ fontSize: 22 }} />
								<div style={{ fontSize: 12 }}>{name}</div>
							</div>
						);
					})}
				</div>
			</Modal>
		</>
	);
};
export default ModalComponent;
