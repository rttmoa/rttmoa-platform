import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux';
import { PersistGate } from 'redux-persist/integration/react';
import '@/styles/tailwind.css';
import 'antd/dist/reset.css';
import '@/styles/index.less';
import '@/assets/fonts/font.less'; // font
import '@/assets/iconfont/iconfont.less'; // iconfont
import 'virtual:svg-icons-register'; // svg
import '@/assets/iconfont-Fonts/iconfontFonts.less';

// todo
// todo redux | redux持久化
// todo 导入字体 | 图标 | CSS | LESS | svg | antdCSS
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			{/* <React.StrictMode> */}
			<App />
			{/* </React.StrictMode> */}
		</PersistGate>
	</Provider>
);
// #region

// 项目注释
// 开发文档

// #endregion
