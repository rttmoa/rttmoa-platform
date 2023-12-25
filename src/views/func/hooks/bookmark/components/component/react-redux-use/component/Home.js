import React from 'react';
import { connect } from 'react-redux';
import {addAction, subAction} from '../store/action';
 
class Home extends React.PureComponent{
    render(){
        return (
            <div>
                 {/* 3.通过props来使用redux中保存的数据 */}
                <p>{this.props.count}</p>
                <button onClick={()=>{this.props.increment()}}>递增</button>
            </div>
        )
    }
}

// 1.mapStateToProps方法：告诉React-Redux, 需要将store中保存的哪些数据映射到当前组件的props上
const mapStateToProps = (state)=>{
    return{
        count: state.count
    }
}

// 2.mapDispatchToProps方法：告诉React-Redux, 需要将哪些派发的任务映射到当前组件的props上
const mapDispatchToProps = (dispatch)=>{
    return{
        increment(){
            dispatch(addAction(1));
        }
    }
}
// 4.connect：关联Home组件与mapStateToProps和mapDispatchToProps方法
export default connect(mapStateToProps, mapDispatchToProps)(Home);