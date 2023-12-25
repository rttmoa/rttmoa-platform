import React from "react";

import AdminHeaderComponent from "./AdminHeaderComponent";
import HeaderComponent from "./HeaderComponent";
import ContentComponent from "./ContentComponent"

// 安装和卸载 React 组件是昂贵的操作。为了提升性能，我们需要减少安装和卸载的操作。

// 很多情况下在我们可能会渲染或不渲染特定元素，这时可以用条件渲染

export default class ConditionalRendering extends React.Component {
  constructor() {
    super() 
    this.state = { name: "Mayank" }
  }
  render() {

    // bad
    // 这里根据name值渲染组件时、只有AdminHeaderComponent组件变化 所以修改代码
    // if(this.state.name === "Mayank") {
    //   return (
    //     <>
    //       <AdminHeaderComponent></AdminHeaderComponent>
    //       <HeaderComponent></HeaderComponent>
    //       <ContentComponent></ContentComponent>
    //     </>
    //   )
    // } else {
    //   return (
    //     <>
    //       <HeaderComponent></HeaderComponent>
    //       <ContentComponent></ContentComponent>
    //     </>
    //   )
    // }

    // better
    return(
        <>
        { this.state.name === "Mayank" && <AdminHeaderComponent></AdminHeaderComponent> }
        <HeaderComponent></HeaderComponent>
        <ContentComponent></ContentComponent>
      </>
    )

  }
}

