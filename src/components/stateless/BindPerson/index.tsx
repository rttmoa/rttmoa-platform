import { Tooltip } from 'antd'
import React, { CSSProperties } from 'react'

const BindPerson: React.FC<{ row: Record<string, any> }> = props => {
	const { row } = props
	const colAlign: CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginLeft: '15px',
	}
	const _OM = () => <div style={row.bindObj.name && colAlign}>{row.bindObj.name ? `运维人员：${row.bindObj.name}` : '-'}</div>
	const _CABINET = () => (
		<div style={colAlign}>
			<div>{row.bindObj.doorNo && `仓号：${row.bindObj.doorNo}`}</div>
			<Tooltip placement="top" arrowContent={row.bindObj.cabinetNo}>
				<div className="ellipsis_styles">{row.bindObj.cabinetNo && `机柜编号：${row.bindObj.cabinetNo}`}</div>
			</Tooltip>
		</div>
	)
	const _USER = () => (
		<div style={colAlign}>
			<div>{row.bindObj.userId && `用户ID：${row.bindObj.userId}`}</div>
			<div>{row.bindObj.name && `用户姓名：${row.bindObj.name}`}</div>
		</div>
	)
	const statusMap: Record<number, Function> = {
		0: () => <>-</>,
		1: () => _OM,
		2: () => _OM,
		3: () => _CABINET,
		4: () => _USER,
		5: () => _USER,
		99: () => _OM,
	}

	return <>{statusMap[row.status] && statusMap[row.status]()}</>
}

export default BindPerson
