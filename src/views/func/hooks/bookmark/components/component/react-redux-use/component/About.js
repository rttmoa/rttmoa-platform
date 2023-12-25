
// 获取网络请求
import React from 'react';
import { connect } from 'react-redux';
import { addAction, changeAction, getUserInfo } from '../store/action';
 
class About extends React.PureComponent {

    // componentDidMount：已经挂载（渲染完成）时，react会自动调用该方法
    componentDidMount() {
        // 发送GET请求
        fetch('http://localhost:7001/info')
            .then((response) => {
                // 转换为json格式
                return response.json();
            })
            .then((data) => {
                // console.log(data);
                this.props.changeInfo(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                {/* 3.通过props来使用redux中保存的数据 */}
                <p>{this.props.count}</p>
                <button onClick={() => { this.props.increment() }}>递增</button>
                <p>{this.props.info.name}</p>
                <p>{this.props.info.age}</p>
            </div>
        )
    }
}
// 1.mapStateToProps方法：告诉React-Redux, 需要将store中保存的哪些数据映射到当前组件的props上
const mapStateToProps = (state) => {
    return {
        count: state.count,
        info: state.info
    }
}
// 2.mapDispatchToProps方法：告诉React-Redux, 需要将哪些派发的任务映射到当前组件的props上
const mapDispatchToProps = (dispatch) => {
    return {
        increment() {
            dispatch(addAction(1));
        },
        changeInfo(info) {
            // dispatch(changeAction(info));

            // 在dispatch派发任务时，直接执行getUserInfo方法
            dispatch(getUserInfo)
        }
    }
}
// 4.connect：关联Home组件与mapStateToProps和mapDispatchToProps方法
export default connect(mapStateToProps, mapDispatchToProps)(About);