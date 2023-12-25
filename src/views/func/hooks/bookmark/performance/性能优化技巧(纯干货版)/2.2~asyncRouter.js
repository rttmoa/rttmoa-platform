// asyncRouter懒加载路由,并实现路由监听

import React, { Component } from "react"

// 存放路由卫视钩子
const routerObserveQueue = []

// 路由懒加载路由卫视钩子
export const RouterHooks = {
    // 路由懒加载之前
    beforeRouterComponentLoad: function(callback) {
        routerObserveQueue.push({
            type: 'before',
            callback
        })
    },
    // 路由懒加载之后
    afterRouterComponentDidLoaded(callback){
        routerObserveQueue.push({
            type: 'after',
            callback
        })
    }
}

// asyncRouter实际就是一个高级组件,将()=>import()作为加载函数传进来，
// 然后当外部Route加载当前组件的时候，
// 在componentDidMount生命周期函数，加载真实的组件，并渲染组件，
// 我们还可以写针对路由懒加载状态定制属于自己的路由监听器beforeRouterComponentLoad和afterRouterComponentDidLoaded

// 路由懒加载HOC
export default function AsyncRouter(loadRouter){
    return class Content extends React.Component {
        constructor(props){
            super(props)
            // 触发每个路由加载之前的钩子函数
            this.dispatchRouterQueue("before")
        }
        state = { Component: null }
        dispatchRouterQueue(type){
            const { history } = this.props;
            routerObserveQueue.forEach(item => {
                if(item.type === type) {
                    item.callback(history)
                }
            })
        }
        componentDidMount(){
            if(this.state.Component) return;
            loadRouter()
                .then(module => module.default)
                .then(Component => this.setState({Component}, ()=> {this.dispatchRouterQueue("after")}))
        }
        render(){
            const {Component} = this.state;
            return Component ? <Component {...this.props} /> : null;
        }
    }
}