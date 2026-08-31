import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux';
import 'antd/dist/reset.css';
import '@/styles/index.css';
import '@/styles/index.less';
import '@/assets/iconfont/iconfont.less';

const container = document.getElementById('root');

if (!container) {
	throw new Error('未找到 #root 挂载节点');
}

const app = (
	<Provider store={store}>
		<PersistGate loading={<div>加载中…</div>} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);

createRoot(container).render(import.meta.env.DEV ? <StrictMode>{app}</StrictMode> : app);
