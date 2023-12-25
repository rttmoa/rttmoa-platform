/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */

// ③ 无状态组件hooks-useMemo 避免重复声明。

// -----------------------------------------------只要点击button、函数内的变量,方法都会重新声明
// 对于无状态组件，数据更新就等于函数上下文的重复执行。
// 那么函数里面的变量，方法就会重新声明。比如如下情况
function Index(){
    const [ number , setNumber  ] = useState(0)
    const handerClick1 = ()=>{ /* 一些操作 */ }
    const handerClick2 = ()=>{ /* 一些操作 */ }
    const handerClick3 = ()=>{ /* 一些操作 */ }
    return <div>
        <a onClick={ handerClick1 } >点我有惊喜1</a>
        <a onClick={ handerClick2 } >点我有惊喜2</a>
        <a onClick={ handerClick3 } >点我有惊喜3</a>
        <button onClick={ ()=> setNumber(number+1) } > 点击 { number } </button>
    </div>
}
 
// -------------------------------------------------useMemo函数缓存
// 每次点击button的时候,都会执行Index函数。
// handerClick1 , handerClick2,handerClick3都会重新声明。
// 为了避免这个情况的发生，我们可以用 useMemo 做缓存，我们可以改成如下
function Index2(){
    const [ number , setNumber  ] = useState(0)
    const [ handerClick1 , handerClick2  ,handerClick3] = useMemo(()=>{
        const fn1 = ()=>{ /* 一些操作 */ }
        const fn2 = ()=>{ /* 一些操作 */ }
        const  fn3= ()=>{ /* 一些操作 */ }
        return [fn1 , fn2 ,fn3]
    },[]) /* 只有当数据里面的依赖项，发生改变的时候，才会重新声明函数。 */
    return <div>
        <a onClick={ handerClick1 } >点我有惊喜1</a>
        <a onClick={ handerClick2 } >点我有惊喜2</a>
        <a onClick={ handerClick3 } >点我有惊喜3</a>
        <button onClick={ ()=> setNumber(number+1) } > 点击 { number } </button>
    </div>
}
// 如下改变之后，handerClick1 , handerClick2, handerClick3 会被缓存下来