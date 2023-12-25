import React, { memo, useMemo, useState } from 'react'
import Detail from '../component/Detail'
import Indexs from '../component/Indexs'
import List from '../component/List'

// 对input表单单独颗粒化处理
// 这样除了当前组件外，其他地方没有收到任何渲染波动，达到了我们想要的目的
const ComponentInput = memo(function({ notifyFatherChange }) {
    const [ inputValue, setInputValue ] = useState("")
    const handerChange = useMemo(() => (e) => {
        setInputValue(e.target.value)
        notifyFatherChange && notifyFatherChange(e.target.value)
    }, [])
    return <input value={inputValue} onChange={handerChange} />
})
 
class Index extends React.Component{
    formData = {}
    render(){
        return <div>
            <Indexs />
            <List />
            <Detail />
            {/* 封装ComponentInput组件 */}
            <div className="box">
                <ComponentInput notifyFatherChange={ value => { this.formData.inputValue = value} } />
                <button onClick={() => console.log(this.formData)}>打印数据</button>
            </div>
            {new Array(10).fill(0).map((item,index)=>{
                    console.log('列表循环了' )
                    return <div key={index} >{item}</div>
            })}
            {/* 这里可能是更复杂的结构 */}
        </div>
    }
}
export default Index