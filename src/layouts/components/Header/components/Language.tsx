import type { MenuProps } from 'antd';
import { Dropdown, Tooltip } from 'antd';
import { useDispatch, RootState, useSelector } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';
import { LanguageType } from '@/redux/interface';

// todof
const Language: React.FC = () => {
	const dispatch = useDispatch();
	const language = useSelector((state: RootState) => state.global.language);

	const setLanguage: MenuProps['onClick'] = val => {
		// console.log(val); // {key: 'en', keyPath: Array(1), domEvent: SyntheticBaseEvent}
		dispatch(setGlobalState({ key: 'language', value: val.key as LanguageType }));
	};

	const items: MenuProps['items'] = [
		{ key: 'zh', label: <span style={{ fontFamily: 'aliFonts' }}>简体中文</span>, disabled: language === 'zh' },
		{ key: 'en', label: <span style={{ fontFamily: 'aliFonts' }}>English</span>, disabled: language === 'en' },
	];

	const menuProps = {
		items,
		onClick: setLanguage,
	};

	return (
		<Tooltip placement='bottom' title='切换中英文' arrow mouseEnterDelay={0.2}>
			<span>
				<Dropdown menu={menuProps} placement='bottom' arrow trigger={['click']}>
					<i className='iconfont icon-zhongyingwen'></i>
				</Dropdown>
			</span>
		</Tooltip>
	);
};
export default Language;
