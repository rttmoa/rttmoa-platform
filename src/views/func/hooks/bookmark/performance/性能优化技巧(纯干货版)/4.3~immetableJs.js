




// 我们用react-redux来简单举一个例子，如下所示 数据都已经被 immetable.js处理

import { is  } from 'immutable'

const GoodItems = connect(state =>(
    { GoodItems: filter(state.getIn(['Items', 'payload', 'list']), state.getIn(['customItems', 'payload', 'list'])) || Immutable.List(), }
)

    /* 此处省略很多代码～～～～～～ */

)(memo(({ Items, dispatch, setSeivceId }) => {

}, (pre, next) => is(pre.Items, next.Items)))
 
// 通过 is 方法来判断，前后Items(对象数据类型)是否发生变化