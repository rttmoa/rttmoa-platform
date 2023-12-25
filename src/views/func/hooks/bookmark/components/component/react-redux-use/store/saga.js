import {takeEvery, takeLatest, put, all} from 'redux-saga/effects'
import {GET_USER_INFO, ADD_COUNT, SUB_COUNT} from './constants';
import {changeAction} from './action';
 
function *myHandler() {
    // 获取网络数据
    const data1 = yield fetch('http://127.0.0.1:7001/info')
        .then((response)=>{
            return response.json();
        })
        .catch((error)=>{
            console.log(error);
        });
    const data2 = yield fetch('http://127.0.0.1:7001/info')
        .then((response)=>{
            return response.json();
        })
        .catch((error)=>{
            console.log(error);
        });
    /*
    如果我们只需要保存一个数据, 那么直接通过 yield put 即可
    但是如果我们想同时保存多个数据, 那么我们就必须借助另外一个函数：all()
    * */
    // yield put(changeAction(data));
    yield all([
        yield put(changeUserAction(data1)),
        yield put(changeInfoAction(data2)),
        yield put({type:'CHANGE_USER_NAME', name: data1.name}),
        yield put({type:'CHANGE_USER_Age', name: data1.age}),
    ])
    console.log('执行到了监听方法的最后', data);
}
function *mySaga() {
    /*
    takeEvery和takeLatest区别: 是否能够完整的执行监听方法
    对于takeEvery而言, 每次拦截到对应类型的action, 都会完整的执行监听方法
    对于takeLatest而言, 每次拦截到对应类型的action, 都不能保证一定能够完整的执行监听方法
    例如: 连续派发了3次GET_USER_INFO的action
         那么对于takeEvery而言, myHandler就会被完整的执行3次
         那么对于takeLatest而言, 如果派发下一次同类型action的时候
         上一次派发的action还没有处理完, 也就是上一次的监听方法还没有处理完
         那么takeLatest会放弃还没有处理完的代码, 直接开始处理下一次的action
    * */
    // yield takeEvery(GET_USER_INFO, myHandler)
    // yield takeLatest(GET_USER_INFO, myHandler)
    /*
    如果我们只需要拦截一个类型的action, 那么直接通过 yield takeEvery / yield takeLatest即可
    但是如果我们想同时拦截多个类型的action, 那么我们就必须借助另外一个函数: all()
    * */
    yield all([
        yield takeEvery(GET_USER_INFO, myHandler),
        yield takeEvery(ADD_COUNT, myHandler),
        yield takeEvery(SUB_COUNT, myHandler),
    ]);
}
export default mySaga;