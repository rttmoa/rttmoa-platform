import React, { lazy, Suspense } from "react";


export default class CallingLazyComponents extends React.Component {
  render() {
    
    let ComponentToLazyLoad = null;
    if(this.props.name === "Mayank") { 
      ComponentToLazyLoad = lazy(() => import("./mayankComponent"));
    } else if(this.props.name === "Anshul") {
      ComponentToLazyLoad = lazy(() => import("./anshulComponent"));
    }
    return <div>
        <h1>This is the Base User: {this.state.name}</h1>
        <Suspense fallback={<div>Loading...</div>}>
            <ComponentToLazyLoad />
        </Suspense>
    </div>
  }
}

// 假设有两个组件 WelcomeComponent 或 GuestComponents，我们根据用户是否登录而渲染其中一个。
// 我们可以根据具体的条件延迟组件加载，无需一开始就加载两个组件
export default class UserSalutation extends React.Component {
    // 这个方法的好处 
        // 主包体积变小，消耗的网络传输时间更少。
        // 动态单独加载的包比较小，可以迅速加载完成。 
            // 我们可以分析应用来决定懒加载哪些组件，从而减少应用的初始加载时间。
    render() {
        if(this.props.username !== "") {
        const WelcomeComponent = lazy(() => import("./welcomeComponent"));
        return (
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <WelcomeComponent />
                </Suspense>
            </div>
        )
        } else {
            const GuestComponent = lazy(() => import("./guestComponent"));
            return (
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <GuestComponent />
                    </Suspense>
                </div>
            )
        }
    }
}

