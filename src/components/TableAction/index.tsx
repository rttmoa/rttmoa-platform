import { Button, Dropdown, MenuProps, Popconfirm } from 'antd';
import { IconFont } from '../Icon';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

// * 操作：下拉显示详情、编辑、删除
// export const TableRenderAction = (entity: any, modalOperate: any, modalResult: any) => {
// 	const menuItems: MenuProps['items'] = [
// 		{
// 			key: 'view',
// 			label: (
// 				<Button type='link' size='small' icon={<EyeOutlined />} onClick={() => modalOperate('detail', entity)}>
// 					查看
// 				</Button>
// 			),
// 		},
// 		{
// 			key: 'edit',
// 			label: (
// 				<Button type='link' size='small' icon={<EditOutlined />} onClick={() => modalOperate('edit', entity)}>
// 					编辑
// 				</Button>
// 			),
// 		},
// 		{
// 			key: 'delete',
// 			label: (
// 				<Popconfirm
// 					title='删除任务！'
// 					description={`你确定要删除： ${entity.postName}`}
// 					onConfirm={() => modalResult('delete', entity)}
// 					okText='确认'
// 					cancelText='取消'
// 					placement='top'
// 					trigger='hover'
// 				>
// 					<Button key='delete' type='link' size='small' danger icon={<DeleteOutlined />}>
// 						删除
// 					</Button>
// 				</Popconfirm>
// 			),
// 		},
// 	];

// 	return (
// 		<div className='more-button'>
// 			<Dropdown menu={{ items: menuItems }} placement='bottom' arrow={{ pointAtCenter: true }} trigger={['click']}>
// 				<div className='more-button-item'>
// 					<IconFont style={{ fontSize: 22 }} type='icon-xiala' />
// 				</div>
// 			</Dropdown>
// 		</div>
// 	);
// };

// * 操作：图标显示详情、编辑、删除
export const TableEditIcon = (record: any, action: any) => {
	// console.log('操作 entity： ', entity);
	return (
		<div key='operate' className='flex flex-row justify-around'>
			{/* 行内编辑 */}
			<div key='edit' className='bg-blue-300 hover:bg-blue-400 w-[30px] h-[22px] flex justify-center items-center rounded-[4px] cursor-pointer' onClick={() => action?.startEditable?.(record._id)}>
				<svg className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='6928' width='16' height='16'>
					<path
						d='M862.709333 116.042667a32 32 0 1 1 45.248 45.248L455.445333 613.813333a32 32 0 1 1-45.258666-45.258666L862.709333 116.053333zM853.333333 448a32 32 0 0 1 64 0v352c0 64.8-52.533333 117.333333-117.333333 117.333333H224c-64.8 0-117.333333-52.533333-117.333333-117.333333V224c0-64.8 52.533333-117.333333 117.333333-117.333333h341.333333a32 32 0 0 1 0 64H224a53.333333 53.333333 0 0 0-53.333333 53.333333v576a53.333333 53.333333 0 0 0 53.333333 53.333333h576a53.333333 53.333333 0 0 0 53.333333-53.333333V448z'
						fill='#000000'
						p-id='6929'
					></path>
				</svg>
			</div>
		</div>
	);
};

// * 操作：图标显示详情、编辑、删除
export const TableRenderAction = (entity: any, modalOperate: any, modalResult: any) => {
	// console.log('操作 entity： ', entity);
	return (
		<div key='operate' className='flex flex-row justify-around'>
			{/* 查看详情 */}
			<div key='detail' className='  bg-green-400 hover:bg-green-500 w-[30px] h-[22px] flex justify-center items-center   rounded-[4px] cursor-pointer' onClick={() => modalOperate('detail', entity)}>
				<svg className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1060' width='16' height='16'>
					<path d='M512.048 768a224 224 0 1 1 0-448 224 224 0 0 1 0 448z m0-64a160 160 0 1 0 0-320 160 160 0 0 0 0 320z' p-id='1061' fill='#ffffff'></path>
					<path
						d='M674.992 706.944Q742.448 639.36 742.448 544q0-95.424-67.456-162.944Q607.408 313.6 512.048 313.6q-95.424 0-162.944 67.456Q281.648 448.64 281.648 544q0 95.424 67.456 162.944Q416.688 774.4 512.048 774.4q95.424 0 162.944-67.456z m-9.088-316.8q63.744 63.744 63.744 153.856t-63.744 153.856Q602.16 761.6 512.048 761.6t-153.856-63.744Q294.448 634.112 294.448 544t63.744-153.856Q421.936 326.4 512.048 326.4t153.856 63.744z m-271.488 36.16Q345.648 475.072 345.648 544t48.704 117.632Q443.184 710.4 512.048 710.4t117.632-48.768q48.768-48.704 48.768-117.632T629.68 426.24Q580.976 377.6 512.048 377.6t-117.632 48.704z m8.96 226.304Q358.448 607.616 358.448 544q0-63.616 44.992-108.608Q448.432 390.4 512.048 390.4q63.616 0 108.608 44.992 44.992 44.992 44.992 108.608 0 63.616-44.992 108.608Q575.664 697.6 512.048 697.6q-63.616 0-108.608-44.992z'
						p-id='1062'
						fill='#ffffff'
					></path>
					<path
						d='M512.048 896C323.248 896 154.224 783.232 5.488 561.856a32 32 0 0 1 0-35.712C154.288 304.704 323.248 192 512.048 192s357.824 112.704 506.56 334.144a32 32 0 0 1 0 35.712c-148.736 221.44-317.76 334.08-506.56 334.08z m0-64c159.872 0 306.752-94.784 441.216-288C818.8 350.72 671.92 256 512.048 256 352.24 256 205.36 350.784 70.832 544 205.36 737.216 352.24 832 512.048 832z'
						p-id='1063'
						fill='#ffffff'
					></path>
					<path
						d='M512.048 896C323.248 896 154.224 783.232 5.488 561.856a32 32 0 0 1 0-35.712C154.288 304.704 323.248 192 512.048 192s357.824 112.704 506.56 334.144a32 32 0 0 1 0 35.712c-148.736 221.44-317.76 334.08-506.56 334.08z m0-12.8q275.328 0 495.936-328.512 7.168-10.688 0-21.44Q787.376 204.8 512.048 204.8T16.112 533.312q-7.232 10.688 0 21.376Q236.72 883.2 512.048 883.2z m0-38.4q-247.424 0-451.776-293.504L55.152 544l5.12-7.296Q264.624 243.2 512.048 243.2t451.776 293.504l5.12 7.296-5.12 7.296Q759.472 844.8 512.048 844.8z m0-12.8c159.872 0 306.752-94.784 441.216-288C818.8 350.72 671.92 256 512.048 256 352.24 256 205.36 350.784 70.832 544 205.36 737.216 352.24 832 512.048 832z'
						p-id='1064'
						fill='#ffffff'
					></path>
				</svg>
			</div>
			{/* 编辑 */}
			<div key='edit' className='bg-blue-400 hover:bg-blue-500 w-[30px] h-[22px] flex justify-center items-center rounded-[4px] cursor-pointer' onClick={() => modalOperate('edit', entity)}>
				<svg className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1242' width='16' height='16'>
					<path
						d='M153.6 902.656a32.256 32.256 0 0 1 0-64h716.8a32.256 32.256 0 0 1 0 64zM743.936 151.04l72.192 72.192a51.2 51.2 0 0 1 0 72.192L358.4 751.616a51.2 51.2 0 0 1-36.352 14.848H226.816a25.6 25.6 0 0 1-25.6-25.6v-97.792a51.2 51.2 0 0 1 14.848-36.352l455.68-455.68a51.2 51.2 0 0 1 72.192 0z m-478.72 497.152v54.272h54.272l442.88-442.88L708.096 204.8z'
						fill='#ffffff'
						p-id='1243'
					></path>
				</svg>
			</div>
			{/* 删除 */}
			<Popconfirm
				title='删除任务！'
				description={`你确定要删除： ${entity?.name || entity?.postName || entity?.meta?.title}`}
				onConfirm={() => modalResult('delete', entity)}
				okText='确认'
				cancelText='取消'
				placement='top'
				trigger='hover'
			>
				<div key='delete' className='bg-red-400 hover:bg-red-500  w-[30px] h-[22px] flex justify-center items-center rounded-[4px] cursor-pointer'>
					<svg className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='881' width='16' height='16'>
						<path
							d='M885.312 213.312h-224a149.312 149.312 0 0 0-298.624 0h-224a37.312 37.312 0 0 0 0 74.56h37.312v597.312c0 41.216 33.408 74.688 74.688 74.688h522.688c41.216 0 74.752-33.344 74.752-74.688V288h37.248a37.312 37.312 0 1 0-0.064-74.688zM512 138.688c41.216 0 74.688 33.536 74.688 74.688H437.312c0-41.152 33.472-74.688 74.688-74.688z m261.312 746.624H250.688V288h522.688v597.312h-0.064z'
							p-id='882'
							fill='#ffffff'
						></path>
						<path
							d='M362.688 792c20.608 0 37.312-16.64 37.312-37.312V456a37.312 37.312 0 0 0-74.624 0v298.688a37.12 37.12 0 0 0 37.312 37.312z m149.312 0c20.608 0 37.312-16.64 37.312-37.312V456a37.312 37.312 0 1 0-74.624 0v298.688c0 20.608 16.704 37.312 37.312 37.312z m149.312 0c20.608 0 37.312-16.64 37.312-37.312V456a37.312 37.312 0 0 0-74.624 0v298.688c0 20.608 16.64 37.312 37.312 37.312z'
							p-id='883'
							fill='#ffffff'
						></path>
					</svg>
				</div>
			</Popconfirm>
		</div>
	);
};
