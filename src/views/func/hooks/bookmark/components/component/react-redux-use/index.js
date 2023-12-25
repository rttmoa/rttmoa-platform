import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { Provider } from 'react-redux'
import store from './store/store';
 

// Redux 的基本使用: https://blog.csdn.net/lilygg/article/details/118256153



ReactDOM.render(
    // 只要利用Provider将祖先组件包裹起来
    // 并且通过Provider的store属性将Redux的store传递给Provider
    // 那么就可以在所有后代中直接使用Redux了
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>
    , document.getElementById('root'));