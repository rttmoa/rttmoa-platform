import { ArrowsAltOutlined, FullscreenOutlined, PlusOutlined, ShrinkOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import Search from 'antd/lib/input/Search' // ! antd/lib/input
import { useDispatch } from '@/redux'
import { setGlobalState } from '@/redux/modules/global'

// * 渲染工具栏
const ToolBarRender = (Params: any) => {
	let { handleModalOpen, quickSearch } = Params
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const dispatch = useDispatch()
	return [
		<Search size="small" placeholder="快捷搜索..." allowClear onSearch={quickSearch} style={{ width: 200 }} />,
		<Button
			type="dashed"
			key="button"
			size="small"
			icon={<PlusOutlined />}
			onClick={() => {
				handleModalOpen(true)
			}}>
			新建
		</Button>,
		<Button
			type="dashed"
			key="button"
			size="small"
			icon={<ArrowsAltOutlined />}
			onClick={() => {
				handleModalOpen(true)
			}}>
			导出EXCEL
		</Button>,
		<Button
			type="dashed"
			key="button"
			size="small"
			icon={<ShrinkOutlined />}
			onClick={() => {
				handleModalOpen(true)
			}}>
			导入EXCEL
		</Button>,
		<Tooltip title="全屏" className="text-lg">
			<span onClick={() => dispatch(setGlobalState({ key: 'maximize', value: true }))}>
				<FullscreenOutlined />
			</span>
		</Tooltip>,
	]
}
export default ToolBarRender
