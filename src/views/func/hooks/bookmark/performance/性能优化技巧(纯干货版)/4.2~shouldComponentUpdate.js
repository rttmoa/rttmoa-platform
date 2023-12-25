










// 使用 shouldComponentUpdate() 以让React知道当state或props的改变是否影响组件的重新render，
// 默认返回ture，返回false时不会重新渲染更新，
// 而且该方法并不会在初始化渲染或当使用 forceUpdate() 时被调用，
// 通常一个shouldComponentUpdate 应用是这么写的


// 控制状态

shouldComponentUpdate(nextProps, nextState) {
    /* 当 state 中 data1 发生改变的时候，重新更新组件 */  
    return nextState.data1 !== this.state.data1
}
// 这个的意思就是 仅当state 中 data1 发生改变的时候，重新更新组件。 控制prop属性


shouldComponentUpdate(nextProps, nextState) {
    /* 当 props 中 data2发生改变的时候，重新更新组件 */  
    return nextProps.data2 !== this.props.data2
}
// 这个的意思就是 仅当props 中 data2 发生改变的时候，重新更新组件