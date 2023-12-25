import React, {useState, useEffect} from "react"
async function getDataA() {return new Promise((reslove, reject) => { if(true) {reslove("成功")}})} 
async function getDataB() {return new Promise((reslove, reject) => { if(true) {reslove("成功")}})} 
async function getDataC() {return new Promise((reslove, reject) => { if(true) {reslove("成功")}})} 


//-------------------------------- 把每一部分抽取出来，形成独立的渲染单元，每个组件都独立数据请求到独立渲染
function ComponentA(){
    const [ dataA, setDataA ] = useState(null)
    useEffect(()=>{
       getDataA().then(res=> setDataA(res.data)  )
    },[])
    return  <div> { /* 用 dataA 数据做展示渲染 */ } </div>
} 
function ComponentB(){
    const [ dataB, setDataB ] = useState(null)
    useEffect(()=>{
       getDataB().then(res=> setDataB(res.data)  )
    },[])
    return  <div> { /* 用 dataB 数据做展示渲染 */ } </div>
} 
function ComponentC(){
    const [ dataC, setDataC ] = useState(null)
    useEffect(()=>{
       getDataC().then(res=> setDataC(res.data)  )
    },[])
    return  <div> { /* 用 dataC 数据做展示渲染 */ } </div>
}  

//----------------------------------- 这样一来，彼此的数据更新都不会相互影响
function Index (){
    return <div>
        <ComponentA />
        <ComponentB />
        <ComponentC />
    </div> 
}
 