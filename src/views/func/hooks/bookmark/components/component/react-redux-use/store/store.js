

/*
    注意点: 如果导入的是redux-thunk, 那么返回给我们的是一个中间件对象
       如果导入的是redux-saga, 那么返回给我们的是一个用于创建中间件对象的方法
* */
import {createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import mySaga from './saga';

// redex-thunk
// // 1.导入thunkMiddleware中间件
// import thunkMiddleware from 'redux-thunk';
// // 2.应用thunkMiddleware中间件
// // 在创建store之前, 通过applyMiddleware方法, 告诉Redux需要应用哪些中间件
// const storeEnhancer = applyMiddleware(thunkMiddleware);
// // 利用store来保存状态（state）
// const store = createStore(reducer, storeEnhancer);

// export default store;



// redux-saga
import createSagaMiddleware from 'redux-saga';
// 2.通过createSagaMiddleware方法，创建saga中间件对象
const sagaMiddleware = createSagaMiddleware();
// 3.应用sagaMiddleware中间件
// 在创建store之前, 通过applyMiddleware方法, 告诉Redux需要应用哪些中间件
const storeEnhancer = applyMiddleware(sagaMiddleware);
// 利用store来保存状态（state）
const store = createStore(reducer, storeEnhancer);
/*
 *  注意点: 如果是redux-thunk, 那么在创建store的时候指定完中间件即可
 *      如果是redux-saga, 那么除了需要在创建store的时候指定中间件以外, 还需要手动的调用中间件的run方法才行
 */
// 4.拦截 action
// 利用传入的生成器告诉redux-saga, 需要拦截哪些dispatch派发的action
sagaMiddleware.run(mySaga); 

export default store;