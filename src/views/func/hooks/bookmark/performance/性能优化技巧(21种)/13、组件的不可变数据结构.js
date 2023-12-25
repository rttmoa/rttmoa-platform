
// React 的灵魂是函数式编程。如果我们希望组件能一致工作，则 React 组件中的状态和 props 数据应该是不可变的。
// 对象的突变可能导致输出不一致

import React from "react"

export default class ImmutableComponentData extends React.Component {
  constructor() {
    super()
    this.state = {
      userInfo: {
        name: "Mayank",
        age: 30,
        designation: "Software Architect"
      }
    }
  }
  
  updateUser() {
    this.setState({ userInfo: { name: "OtherUser" } })
  }
 
  // 在 shouldComponentUpdate 函数中我们指定，如果 userInfo 的初始值与 userInfo 的新值不同，则应该重新渲染该组件；反之不应重新渲染组件
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextState)
    if(nextState.userInfo !== this.state.userInfo) {
      return true;
    }
  }
  
  render() {
    return (
      <>
        User Name: <b>{this.state.userInfo.name} </b>
        <button onClick={this.updateUser.bind(this)}>改变userInfo</button>
      </>
    )
  }
}

