
import React from "react"



// PureComponent只会浅层比较、
// 如果对象包含复杂的数据结构(比如对象和数组)，
// 他会浅比较，如果深层次的改变，是无法作出判断的，
// React.PureComponent 认为没有变化，而没有渲染试图

class Text extends React.PureComponent { 
    render(){
        console.log(this.props)
        return <div>hello,wrold</div>
    }
}
class Index extends React.Component{
    state={
        data:{ a : 1 , b : 2 }
    }
    handerClick=()=>{
        const { data } = this.state
        data.a++
        this.setState({ data })
    }
    render(){
        const { data } = this.state
        console.log("render函数渲染了")
        return <div>
            <button onClick={ this.handerClick } >点击</button> {/* 持续点击Text组件没有反应 */}

            {/* data对象包含复杂数据结构：纯组件无法判断 */}
            {/* <Text data={data} /> */}
            
            {/* data对象中是对象属性值：纯组件可以判断 */}
            <Text data={{ ...data }} />
        </div>
    }
}