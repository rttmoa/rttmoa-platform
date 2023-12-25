


class Index extends React.Component{

    state = {
        dataA:null,
        dataB:null,
        dataC:null
    }
    async componentDidMount(){
        /* 获取A区域数据 */
        const dataA = await getDataA()
        this.setState({ dataA })
        /* 获取B区域数据 */
        const dataB = await getDataB()
        this.setState({ dataB })
        /* 获取C区域数据 */
        const dataC = await getDataC()
        this.setState({ dataC })
    }
    render(){
        const { dataA , dataB , dataC } = this.state
        console.log(dataA,dataB,dataC)

        return <div>
            <div> { /* 用 dataA 数据做展示渲染 */ } </div>
            <div> { /* 用 dataB 数据做展示渲染 */ } </div>
            <div> { /* 用 dataC 数据做展示渲染 */ } </div>
        </div>
    }
}