import React from "react";


// 使用 shouldComponentUpdate 生命周期事件

export default class ShouldComponentUpdateUsage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Mayank",
      age: 30,
      designation: "Architect",
    }
  }
  
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        designation: "Senior Architect"
      })
    }, 2000)
  }
               
  shouldComponentUpdate(nextProps, nextState) {
      if(nextState.age !== this.state.age || nextState.name === this.state.name) {
        return true;
      }
      return false;
  }
  
  render() {
    return (
      <div>
        <b>User Name:</b> {this.state.name}
        <b>User Age:</b> {this.state.age}
      </div>
    )
  }
}