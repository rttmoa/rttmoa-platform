// ②循环正确使用key

// 错误用法一：用index做key
// 这种加key的性能,实际和不加key效果差不多，每次还是从头到尾diff
function index(){
    const list = [ { id:1 , name:'哈哈' } , { id:2, name:'嘿嘿' } ,{ id:3 , name:'嘻嘻' } ]
    return <div>
       <ul>
         {  list.map((item,index)=><li key={index} >{ item.name }</li>)  }
       </ul>
    </div>
}
 

// 错误用法二:用index拼接其他的字段
// 如果有元素移动或者删除，那么就失去了一一对应关系，剩下的节点都不能有效复用
function index2(){
    const list = [ { id:1 , name:'哈哈' } , { id:2, name:'嘿嘿' } ,{ id:3 , name:'嘻嘻' } ]
    return <div>
       <ul>
         {  list.map((item,index)=><li key={index + item.name } >{ item.name }</li>)  }
       </ul>
    </div>
}
 

// 正确用法：用唯一id作为key
// 用唯一的健id作为key,能够做到有效复用元素节点
function index3(){
    const list = [ { id:1 , name:'哈哈' } , { id:2, name:'嘿嘿' } ,{ id:3 , name:'嘻嘻' } ]
    return <div>
       <ul>
         {  list.map((item,index)=><li key={ item.id } >{ item.name }</li>)  }
       </ul>
    </div>
}
 