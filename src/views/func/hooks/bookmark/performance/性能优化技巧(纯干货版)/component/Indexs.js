import React, { Component } from 'react'





export default class Indexs extends Component {
  render() {
    return (
      <div>
          {
            new Array(10).fill(0).map((item,index)=>{
                console.log('组件C列表循环了' )
                return <div key={index} >{item}</div>
            })
          }
      </div>
    ) 
  }
}
