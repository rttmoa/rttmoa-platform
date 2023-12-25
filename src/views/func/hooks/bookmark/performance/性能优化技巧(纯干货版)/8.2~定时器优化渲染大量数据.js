import React from "react"




// 我们看到 40000 个 简单列表渲染了，将近5秒的时间。
// 为了解决一次性加载大量数据的问题。
// 我们引出了时间分片的概念，就是用setTimeout把任务分割，分成若干次来渲染。
// 一共40000个数据，我们可以每次渲染100个， 分次400渲染
class Index extends React.Component {
    state={
       list: []
    }
    handerClick=()=>{
       this.sliceTime(new Array(40000).fill(0), 0)
    }
    sliceTime=(list, times)=>{
        if(times === 400) return 
        setTimeout(() => {
            const newList = list.slice( times , (times + 1) * 100 ) /* 每次截取 100 个 */
            this.setState({
                list: this.state.list.concat(newList)
            })
            this.sliceTime( list ,times + 1 ) // times从0开始一直到399，重复调用sliceTime函数
        }, 0)
    }
    render(){
        const { list } = this.state
        return <div>
            <button onClick={ this.handerClick } >点击</button>
            {
                list.map((item,index)=><li className="list"  key={index} >
                    { item  + '' + index } Item
                </li>)
            }
        </div>
    }
}
 