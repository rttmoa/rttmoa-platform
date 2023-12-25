import React from "react";



// this绑定时在 constructor 中
export default class DelayedBinding extends React.Component {
  constructor() {
    super()

    this.state = {
      name: "Mayank"
    }
    // 这将减少将函数绑定到当前上下文的开销，无需在每次渲染时重新创建函数，从而提高应用的性能
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }
  
  handleButtonClick() {
    alert("Button Clicked: " + this.state.name)
  }
  
  render() {
    return (
      <>
        <input type="button" value="Click" onClick={this.handleButtonClick} />
        {/* <input type="button" value="Click" onClick={this.handleButtonClick.bind(this)} /> */}
        {/* <input type="button" value="Click" onClick={this.handleButtonClick.bind(this, "吃饭")} /> */}
      </>
    )
  }
}

