import React from 'react'
import Detail from '../component/Detail'
import Indexs from '../component/Indexs'
import List from '../component/List'



// 当在输入框输入时、不断触发render函数中的所有数据、非常浪费性能

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            inputValue:''
        }
    }
    handerChange=(e)=> this.setState({ inputValue:e.target.value  })
    render(){
        const { inputValue } = this.state
        return <div>
            <Indexs />
            <List />
            <Detail />
            <div className="box" >
                <input  value={inputValue}  onChange={ (e)=> this.handerChange(e) } />
            </div>
            {/* 我们首先来一个列表循环 */}
            {
                new Array(10).fill(0).map((item,index)=>{
                    console.log('列表循环了' )
                    return <div key={index} >{item}</div>
                })
            }
            {
              /* 这里可能是更复杂的结构 */
              /* ------------------ */
            }
        </div>
    }
}
export default Index