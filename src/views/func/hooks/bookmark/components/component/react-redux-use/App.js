import React from 'react';
import store from './store/store.js';
import {addAction, subAction } from './store/action.js';
 
// Redux 的基本使用: https://blog.csdn.net/lilygg/article/details/118256153

class App extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            // 1.getState()：获取存储的状态（数据）
            count: store.getState().count
        }
    }
    // componentDidMount：当组件被挂载时(已经完成渲染)，react会自动调用该方法
    componentDidMount() {
        // 3.subscribe()：监听状态的改变
        store.subscribe(()=>{
            // 将修改后的数据重新存储到state中
            this.setState({
                count: store.getState().count
            })
        })
    }
    // componentWillUnmount：当组件被卸载时，react会自动调用该方法
    componentWillUnmount() {
        // 4.unsubscribe()：移除监听状态的改变事件
        store.unsubscribe();
    }
 
    render(){
        return(
            <div>
                <p>{this.state.count}</p>
                <button onClick={()=>{this.btnClick()}}>增加</button>
            </div>
        )
    }
    btnClick(){
        // 2.dispatch()：修改Store中存储的状态
        store.dispatch(addAction(5));
    }
}
 
export default App;