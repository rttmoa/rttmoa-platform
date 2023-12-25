

// 传统路由
// 如果我们没有用umi等框架，需要手动配置路由的时候，也许路由会这样配置

// <Switch>
//     <Route path={'/index'} component={Index} ></Route>
//     <Route path={'/list'} component={List} ></Route>
//     <Route path={'/detail'} component={ Detail } ></Route>
//     <Redirect from='/*' to='/index' />
// </Switch>
 


//  或者用list保存路由信息，方便在进行路由拦截，或者配置路由菜单等。
//  const router = [
//     {
//         'path': '/index',
//         'component': Index
//     },
//     {
//         'path': '/list'',
//         'component': List
//     },
//     {
//         'path': '/detail',
//         'component': Detail
//     },
// ]