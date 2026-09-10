import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StyleProvider } from '@ant-design/cssinjs';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux';
import '@/styles/index.css';
import '@/styles/index.less';
import '@/assets/iconfont/iconfont.less';

const container = document.getElementById('root');

if (!container) {
	throw new Error('未找到 #root 挂载节点');
}

const app = (
	<StyleProvider layer>
		<Provider store={store}>
			<PersistGate loading={<div>加载中…</div>} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</StyleProvider>
);

createRoot(container).render(import.meta.env.DEV ? <StrictMode>{app}</StrictMode> : app);
