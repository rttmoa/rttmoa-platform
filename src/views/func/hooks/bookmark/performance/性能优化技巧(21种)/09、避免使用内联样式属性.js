


import React from "react";


// 使用内联样式时浏览器需要花费更多时间来处理脚本和渲染，
    // 因为它必须映射传递给实际 CSS 属性的所有样式规则
export default class InlineStyledComponents extends React.Component {
  render() {
    return (

      <>
        {/* 避免使用内联样式属性 */}
        <b style={{"backgroundColor": "blue"}}>Welcome to Sample Page</b>
      </>
      
    )
  }
}

