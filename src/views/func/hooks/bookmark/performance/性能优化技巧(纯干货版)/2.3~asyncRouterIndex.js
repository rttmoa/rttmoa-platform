// 这样一来，我们既做到了路由的懒加载，又弥补了react-router没有监听当前路由变化的监听函数的缺陷
import React, { useEffect } from 'react'
import AsyncRouter, { RouterHooks } from './2.2~asyncRouter.js';  // export default 和 export const
 
const { beforeRouterComponentLoad } = RouterHooks;
const Indexs = AsyncRouter(() => import("../component/Indexs.js"))
const List = AsyncRouter(() => import("../component/List.js"))
const Detail = AsyncRouter(() => import("../component/Detail.js"))

 
const Index = () => {
    
    useEffect(() => {
        // 增加监听函数
        beforeRouterComponentLoad( history => {
            console.log("当前激活的路由是:", history.location.pathname)
        })
    }, [])
    
    
    return(
        // Meuns: 菜单： 渲染首页、列表、详情
        <>
            {/* <Router>
                <Meuns />
                <Switch>
                   <Route path={'/index'} component={Indexs} ></Route>
                   <Route path={'/list'} component={List} ></Route>
                   <Route path={'/detail'} component={ Detail } ></Route>
                   <Redirect from='/*' to='/index' />
                </Switch>
            </Router> */}
        </>
    )
}


export default Index