


import { ADD_COUNT, SUB_COUNT, CHANGE_INFO, GET_USER_INFO } from './constants';
 
// 利用action来修改状态
// const addAction = {type:ADD_COUNT, num: 1};
// const subAction = {type:SUB_COUNT, num: -1};

// 优化：
export const addAction = (num)=>{
    return {type:ADD_COUNT, num: num};
};
export const subAction = (num)=>{
    return {type:SUB_COUNT, num: num};
};
export const changeAction = (info)=>{
    return {type:CHANGE_INFO, info: info};
};
// export const getUserInfo = () => {
//     return { type: GET_USER_INFO }
// }

// 定义getUserInfo方法，在这个方法中发送网络请求并派发任务
export const getUserInfo = (dispatch, getState)=>{
    // 发送GET请求
    fetch('http://localhost:7001/info')
        .then((response) => {
            // 转换为json格式
            return response.json();
        })
        .then((data) => {
            // console.log(data);
            // dispatch：派发任务
            dispatch(changeAction(data));
        })
        .catch((error) => {
            console.log(error);
        })
} 