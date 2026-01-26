import useEnterSubmit from '@/hooks/useTable/useEnterSubmit';
import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Select, Tree } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';

const ModalComponent = (Params: any) => {
	const { Menus, form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo: userInfo, handleModalSubmit } = Params;

	const [treeData, setTreeData] = useState<any[]>([]);
	const [keyToId, setKeyToId] = useState<Record<string, string>>({});
	const [expandedKeys, setExpandedKeys] = useState<any[]>([]);
	const [checkedKeys, setCheckedKeys] = useState<any[]>([]); // 设置 keys

	useEnterSubmit(modalIsVisible, () => form.submit()); // * 回车提交表单数据

	useEffect(() => {
		function handleSelectKeys(Menus: any[], allSelectKeys: any) {
			const isDisabled = (enable: string) => String(enable ?? '') === '关闭';

			const collectDisabledKeys = (nodes: any[], out = new Set()) => {
				for (const node of nodes ?? []) {
					const key = node?.meta?.key;
					if (key && isDisabled(node?.meta?.enable)) out.add(key);
					const children = node?.children;
					if (Array.isArray(children) && children.length) collectDisabledKeys(children, out);
				}
				return out;
			};

			const disabledKeys = collectDisabledKeys(Menus);
			const readEnabled = allSelectKeys.filter((key: any) => !disabledKeys.has(key));
			const readDisabled = allSelectKeys.filter((key: any) => disabledKeys.has(key));
			return readEnabled;
		}
		const buildTreeAndMaps = (routes: any[]) => {
			const k2i: Record<string, string> = {};
			const i2k: Record<string, string> = {};
			const walk = (nodes: any[]): any[] =>
				nodes.map((route: any) => {
					const key = route.meta?.key || '';
					const id = route.unique || '';
					const enable = route.meta.enable == '开启'; // 不等于开启的部分全部禁用掉
					if (key && id) {
						k2i[key] = id;
						i2k[id] = key;
					}
					let item: any = { title: route.meta?.title || '', key, disableCheckbox: !enable };
					if (route.meta?.title == '首页') {
						item.disableCheckbox = true;
					}
					if (Array.isArray(route.children) && route.children.length > 0) {
						item.children = walk(route.children);
					}
					return item;
				});
			return { tree: walk(routes), k2i, i2k };
		};

		const getLeafKeys = (nodes: any[]) => {
			const list: any[] = [];
			const walk = (arr: any[]) => {
				arr.forEach((item: any) => {
					if (item.children && item.children.length) {
						walk(item.children);
					} else {
						list.push(item.key);
					}
				});
			};
			walk(nodes);
			return list;
		};

		const { tree, k2i, i2k } = buildTreeAndMaps(Menus || []);
		setTreeData(tree);
		setKeyToId(k2i);
		setExpandedKeys([]);

		const initKeysRaw =
			modalType === 'create'
				? []
				: Array.isArray(userInfo.permission_ids)
					? userInfo.permission_ids.map((id: string) => i2k[id]).filter(Boolean)
					: Array.isArray(userInfo.menuList)
						? userInfo.menuList.map((id: string) => i2k[id]).filter(Boolean)
						: [];
		const leafSet = new Set(getLeafKeys(tree));
		const initKeysLeaf = initKeysRaw.filter((k: string) => leafSet.has(k));
		// console.log('initKeysLeaf', initKeysRaw);

		// setCheckedKeys(initKeysLeaf.length > 0 ? initKeysLeaf : initKeysRaw);
		setCheckedKeys(initKeysLeaf.length > 0 ? handleSelectKeys(Menus, initKeysLeaf) : handleSelectKeys(Menus, initKeysRaw));

		form.setFieldsValue({
			role_name: modalType === 'create' ? '' : userInfo.role_name,
			permission_str: modalType === 'create' ? '' : userInfo.permission_str,
			level: modalType === 'create' ? 1 : userInfo.level,
			sort: modalType === 'create' ? 1 : userInfo.sort,
			status: modalType === 'create' ? '启用' : userInfo.status,
			desc: modalType === 'create' ? '' : userInfo.desc,
		});
	}, [Menus, modalType, userInfo, modalIsVisible]);

	// * 提交最终数据 （将菜单处理为menu格式、为每个角色可以直接使用的菜单结构）
	const FormOnFinish = () => {
		const getPath = (nodes: any[], target: any, path: any[] = []) => {
			for (const node of nodes) {
				const current = node.key;
				const next = [...path, current];
				if (current === target) return next;
				if (node.children && node.children.length) {
					const found: any = getPath(node.children, target, next);
					if (found) return found;
				}
			}
			return null;
		};
		const collectWithAncestors = (nodes: any[], keys: any[]) => {
			const set = new Set<any>();
			keys.forEach(k => {
				const path = getPath(nodes, k);
				if (path) path.forEach((p: any) => set.add(p));
			});
			return Array.from(set);
		};
		const flat = collectWithAncestors(treeData, checkedKeys);
		const menuIds = flat.map(k => keyToId[k]).filter(Boolean);
		const checkedIds = checkedKeys.map(k => keyToId[k]).filter(Boolean);
		const formList = form.getFieldsValue();
		if (modalType === 'edit') {
			formList._id = userInfo._id;
		}
		formList.permission_menu = checkedKeys;
		formList.permission_ids = checkedIds;
		formList.menuList = menuIds;
		handleModalSubmit && handleModalSubmit(modalType, formList);
	};

	const getAllKeys = (nodes: any[]) => {
		const list: any[] = [];
		const walk = (arr: any[]) => {
			arr.forEach((item: any) => {
				list.push(item.key);
				if (item.children) walk(item.children);
			});
		};
		walk(nodes);
		return list;
	};
	// 展开/折叠
	const ExpandedFunc = (e: any) => setExpandedKeys(e.target.checked ? getAllKeys(treeData) : []);
	// 全选/全不选
	const SelectAllFunc = (e: any) => setCheckedKeys(e.target.checked ? getAllKeys(treeData) : []);

	const OnSubmit = () => form.submit();

	const onCancel = () => {
		setExpandedKeys([]);
		setCheckedKeys([]);
		setModalIsVisible(false);
	};

	return (
		<Modal
			title={`${modalTitle} ${userInfo?.role_name || '角色'}`}
			width={650}
			open={modalIsVisible}
			onCancel={onCancel}
			footer={[
				<Button danger loading={false} onClick={onCancel}>
					取消
				</Button>,
				<Button key='link' type='primary' loading={false} onClick={OnSubmit}>
					提交
				</Button>,
			]}
		>
			<Form className='mt-[20px] mb-[50px] px-[20px] max-h-[850px] overflow-auto' layout='horizontal' form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} onFinish={FormOnFinish}>
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item label='角色名称' name='role_name' rules={[{ required: true, message: '必填：角色名称' }]}>
							<Input placeholder='请输入角色名称' />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='权限字符' name='permission_str' rules={[{ required: true, message: '必填：权限字符' }]}>
							<Input placeholder='请输入权限字符' />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='角色级别' name='level' rules={[{ required: true, message: '必填：角色级别' }]}>
							<InputNumber defaultValue={1} className='always-show-handler' keyboard={false} />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='角色顺序' name='sort' rules={[{ required: true, message: '必填：角色顺序' }]}>
							<InputNumber defaultValue={1} className='always-show-handler' keyboard={false} />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='角色状态' name='status' rules={[{ required: true, message: '必选：角色状态' }]}>
							<Select
								options={[
									{ label: '启用', value: '启用' },
									{ label: '停用', value: '停用' },
								]}
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='菜单分配' name='permission_menu' rules={[{ required: false, message: '必填：菜单权限' }]}>
							<div className='mt-[6px] px-3 w-full flex justify-between'>
								<div>
									<Checkbox onChange={ExpandedFunc}>展开/折叠</Checkbox>
								</div>
								<div>
									<Checkbox onChange={SelectAllFunc}>全选/全不选</Checkbox>
								</div>
								<div>
									<Checkbox defaultChecked onChange={() => {}}>
										父子联动
									</Checkbox>
								</div>
							</div>
							<div className='mt-3 w-full p-3  border-[1px] rounded-lg'>
								<Tree
									// checkStrictly={!linkage} // 父子联动
									checkStrictly={false}
									showLine
									checkable
									treeData={treeData}
									checkedKeys={checkedKeys}
									expandedKeys={expandedKeys}
									onExpand={(keys: any) => {
										setExpandedKeys(keys);
									}}
									onCheck={(keys: any) => {
										setCheckedKeys(keys);
									}}
								/>
							</div>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='角色描述' name='desc' rules={[{ required: false }]}>
							<TextArea rows={3} placeholder='请输入内容' maxLength={60} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};
export default ModalComponent;
