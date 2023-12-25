import React from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

const initialState = { 
    num: 0 ,
    val : 100,
    list : [{ key: 1, name: '张三' },
    { key: 2, name: '李四' },
    { key: 3, name: '王五' },]
};
const reducer = (state, action) => {
    switch (action.type) {
        case "decrement":
            return { ...state, num: state.num - 1 };
        case "increment":
            return { ...state, num: state.num + 1 };
        default: 
            return state;
    }
};
const store = createStore(reducer, initialState);

const Child1 = () => {
    const num = useSelector(state => state.num);
    const dispatch = useDispatch();
    return (
        <div>
            <h3>---子组件---</h3>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
                Number: {num}
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        </div>
    );
};
const App = () => {
    return (
        <div>
            <h2>---父组件---</h2>
            <Provider store={store}>
                <Child1 />
            </Provider>
        </div>
    )
}

export default App;
