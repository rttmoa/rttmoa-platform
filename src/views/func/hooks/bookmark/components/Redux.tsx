// 导入redux
const redux = require("redux");

// 优化：定义常量
const ADD_COUNT = "ADD_COUNT";
const SUB_COUNT = "SUB_COUNT";

// 1.定义一个状态（数据)
const initialState = {
  count: 0
};

// 2.利用store保存状态
let store = redux.createStore(reducer);

// 3.优化：利用action修改状态
const addAction = (num: number) => {
  return { type: ADD_COUNT, num: num };
};
const subAction = (num: number) => {
  return { type: SUB_COUNT, num: num };
};

// 利用reducer将store和action串联起来
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case "ADD_COUNT":
      return { count: state.count + action.num };
    case "SUB_COUNT":
      return { count: state.count - action.num };
    default:
      return state;
  }
}

/** #### TODO: Redux（介绍）：http://www.rply.cn/news/57384.html  */
//   /docs/react-redux（基本使用）.rar
/** #### TODO: Redux（详细）：https://blog.csdn.net/lilygg/article/details/118256153  */

// 在组件中如何使用？

// 1.监听状态的改变
store.subscribe(() => {
  console.log("subscribe", store.getState());
});

// 2.获取Store中存储的状态
console.log(store.getState());

// 3.修改Store中存储的状态
store.dispatch(addAction(2)); // +2
store.dispatch(subAction(5)); // -5
