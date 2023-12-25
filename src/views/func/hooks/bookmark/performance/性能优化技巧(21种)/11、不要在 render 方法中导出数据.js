import React from "react";


// 纯函数意味着我们应该确保 setState 和查询原生 DOM 元素等任何可以修改应用状态的东西不会被调用。
// 该函数永远不该更新应用的状态。
// 更新组件状态的问题在于，当状态更新时会触发另一个 render 循环，后者在内部会再触发一个 render 循环，以此类推
export default class RenderFunctionOptimization extends React.Component {
  constructor() {
    super()

    this.state = { name: "Mayank" }
  }
  

  render() {
    
    /* bad */
    this.setState({ 
      name: this.state.name + "_" 
    });
    
    return (
      <div>
        <b>User Name: {this.state.name}</b>
      </div>
    );
  }
  // 上面render()函数中
  // 每次调用 render 函数时都会更新状态。状态更新后组件将立即重新渲染。因此更新状态会导致 render 函数的递归调用。
  // render 函数应保持纯净，以确保组件以一致的方式运行和渲染
}

