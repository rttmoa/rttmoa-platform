import React from "react";
import axios from "axios";

export default class UsingAsyncInComponentWillMount extends React.Component {

  constructor() {
    super()
    this.state = {
      userData: null
    }
  }
  // 由于 API 调用是异步的，因此组件在调用 render 函数之前不会等待 API 返回数据。于是在初始渲染中渲染组件时没有任何数据
  componentWillMount() {
    axios.get("someResourceUrl").then((data) => {
      this.setState({
        userData: data
      });
    });
  }
  
  render() {
    return (
      <>
        <b>UserName: {this.state.name}</b>
        <b>UserAge: {this.state.age}</b>
      </>
    )
  }
}
    // 在上面的代码中，我们正在进行异步调用以获取数据。由于数据调用是异步的，需要一段时间才能获取到。

    // 在检索数据时 React 会触发组件的 render 函数。因此第一个调用的渲染仍然不包含它所需的数据。

    // 这样一开始渲染组件没有数据，然后检索数据，调用 setState，还得重新渲染组件。在 componentWillMount 阶段进行 AJAX 调用没有好处可言。

    // 我们应避免在此函数中发出 Async 请求。这些函数和调用可以延迟到 componentDidMount 生命周期事件里。