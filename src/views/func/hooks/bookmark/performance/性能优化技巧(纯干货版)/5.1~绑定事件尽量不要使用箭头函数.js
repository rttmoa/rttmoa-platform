/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */

// ① 绑定事件尽量不要使用箭头函数(指的是直接在DOM上处理函数返回)

// 每次渲染时都会创建一个新的事件处理器，这会导致 ChildComponent 每次都会被渲染
// <ChildComponent handerClick={()=>{ console.log(666) }}  />
 
// 即便我们用箭头函数绑定给dom元素
// 每次react合成事件事件的时候，也都会重新声明一个新事件
//  <div onClick={ ()=>{ console.log(777) } } >hello,world</div>

// 解决这个问题事件很简单，分为无状态组件和有状态组件
import React, {useMemo, useCallback, useState } from 'react'
// 有状态组件
class index extends React.Component{
    handerClick=()=>{
        console.log(666)
    }
    handerClick1=()=>{
        console.log(777)
    }
    render(){
        return <div>
            <ChildComponent handerClick={ this.handerClick }  />
            <div onClick={ this.handerClick1 }  >hello,world</div>
        </div>
    }
}
// 无状态组件
function indexs(){
    const handerClick1 = useMemo(()=>()=>{
       console.log(777)
    },[])  /* [] 存在当前 handerClick1 的依赖项*/
    const handerClick = useCallback(()=>{ console.log(666) },[])  /* [] 存在当前 handerClick 的依赖项*/
    return <div>
        <ChildComponent handerClick={ handerClick }  />
        <div onClick={ handerClick1 }  >hello,world</div>
    </div>
}
 
// 对于DOM我们需要传递参数
function indexss(){
    const handerClick1 = useMemo(()=>(event)=>{
        const mes = event.currentTarget.dataset.mes
        console.log(mes) /* hello,world */
    },[])
    return <div>
        <div  data-mes={ 'hello,world' } onClick={ handerClick1 }  >hello,world</div>
    </div>
}