import { RootState, useSelector } from '@/redux';
import { useTranslation } from 'react-i18next';

const UserName: React.FC = () => {
	const { t } = useTranslation();
	const userInfo: any = useSelector((state: RootState) => state.user.userInfo);
	const username = userInfo.name;
	// console.log('s', userInfo);
	return <span className='username'>{userInfo?.username || ''}</span>;
};

export default UserName;
