import React from "react";



export default class InlineFunctionComponent extends React.Component {
  
  setNewStateData = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }
  
  render() {
    return (
      <div>
        <h1>Welcome Guest</h1>
        {/* bad */}
        {/* <input type="button" onClick={(e) => { this.setState({inputValue: e.target.value}) }} value="Click For Inline Function" /> */}

        {/* better */}
        <input type="button" onClick={this.setNewStateData} value="Click For Inline Function" />
      </div>
    )
  }
}

// 如果我们使用内联函数，则每次调用“render”函数时都会创建一个新的函数实例。
// 当 React 进行虚拟 DOM diffing 时，它每次都会找到一个新的函数实例；因此在渲染阶段它会会绑定新函数并将旧实例扔给垃圾回收。
// 因此直接绑定内联函数就需要额外做垃圾回收和绑定到 DOM 的新函数的工作



// 所以不要用内联函数，而是在组件内部创建一个函数，并将事件绑定到该函数本身。
// 这样每次调用 render 时就不会创建单独的函数实例了，参考组件如下