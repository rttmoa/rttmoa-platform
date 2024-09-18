import React from 'react'
import { useDispatch } from '@/redux'
import { RootState, useSelector } from '@/redux'
import { setGlobalState } from '@/redux/modules/global'

// ? 开启 最大化
const Maximize: React.FC = () => {
	const dispatch = useDispatch()
	const maximize = useSelector((state: RootState) => state.global.maximize)
	return (
		<>
			{maximize && (
				<div className="maximize-icon" onClick={() => dispatch(setGlobalState({ key: 'maximize', value: false }))}>
					<i className="iconfont icon-tuichu"></i>
				</div>
			)}
		</>
	)
}
export default Maximize
