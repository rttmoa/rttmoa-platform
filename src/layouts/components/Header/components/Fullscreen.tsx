import { useFullscreen } from 'ahooks';
import { Tooltip } from 'antd';

const Fullscreen: React.FC = () => {
	const [isFullscreen, { toggleFullscreen }] = useFullscreen(() => document.body);

	return (
		<Tooltip placement='bottom' title='网页全屏' arrow mouseEnterDelay={0.2}>
			<i className={`iconfont ${isFullscreen ? 'icon-suoxiao' : 'icon-fangda'}`} onClick={toggleFullscreen}></i>
		</Tooltip>
	);
};

export default Fullscreen;
