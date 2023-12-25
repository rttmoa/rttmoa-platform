import { takeEvery, put } from 'redux-saga/effects'
import { GET_USER_INFO } from './constants';
import { changeAction } from './action';
 
function *myHandler() {
    // 获取网络数据
    const data = yield fetch('http://127.0.0.1:7001/info')
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
        });
    // console.log(data);
    // 保存获取到的数据，相当于 store.dispatch(changeAction());
    yield put(changeAction(data));
}
function *mySaga() {
    // 第一个参数：指定需要拦截的action类型
    // 第二个参数：指定拦截到这个类型的action之后交给谁来处理
    yield takeEvery(GET_USER_INFO, myHandler)
}
 
export default mySaga;