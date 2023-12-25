import React from "react";

export default class DelayedBinding extends React.Component {
  constructor() {
    this.state = {
      name: "Mayank"
    }
  }
  
  // 箭头函数 不是类的原型属性    影响了可复用性
  handleButtonClick = () => {
    alert("Button Clicked: " + this.state.name)
  }
  
  render() {
    return (
      <>
        <input type="button" value="Click" onClick={this.handleButtonClick} />
      </>
    )
  }
}


// 箭头函数好处多多，但也有缺点。

// 当我们添加箭头函数时，该函数被添加为对象实例，而不是类的原型属性。这意味着如果我们多次复用组件，那么在组件外创建的每个对象中都会有这些函数的多个实例。

// 每个组件都会有这些函数的一份实例，影响了可复用性。此外因为它是对象属性而不是原型属性，所以这些函数在继承链中不可用。

// 因此箭头函数确实有其缺点。实现这些函数的最佳方法是在构造函数中绑定函数