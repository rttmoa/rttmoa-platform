import React, { Component } from 'react'



// 时间分片的概念，就是一次性渲染大量数据，初始化的时候会出现卡顿等现象。
// 我们必须要明白的一个道理，js执行永远要比dom渲染快的多。 ，
// 所以对于大量的数据，一次性渲染，容易造成卡顿，卡死的情况。我们先来看一下例子


// 我们看到 40000 个 简单列表渲染了，将近5秒的时间。为了解决一次性加载大量数据的问题。
// 我们引出了时间分片的概念，就是用setTimeout把任务分割，分成若干次来渲染。
// 一共40000个数据，我们可以每次渲染100个， 分次400渲染
export default class Index extends Component {
    state = {
        list: []
    }

    handerClick = () => {
        let startTime = new Date().getTime()
        this.setState({ 
            list: new Array(40000).fill(0)
        }, () => {
            let endTime = new Date().getTime()
            console.log( (endTime - startTime) / 1000 + "秒" )
        });
    }

    render() {
        const { list } = this.state;
        return (
            <div>
                <button onClick={this.handerClick}>点击</button>
                {
                    list.map((item, index) => {
                        return <li className='list' key={index}>
                            { item  + '' + index } Item
                        </li>
                    })
                }
            </div>
        )
  }
}
