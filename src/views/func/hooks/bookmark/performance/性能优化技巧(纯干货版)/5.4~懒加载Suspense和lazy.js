import React from 'react';

// ④懒加载 Suspense 和 lazy


// Suspense 和 lazy 可以实现 dynamic import 懒加载效果，原理和上述的路由懒加载差不多。
// 在 React 中的使用方法是在 Suspense 组件中使用 <LazyComponent> 组件
const LazyComponent = React.lazy(() => import('./LazyComponent'));
 

// LazyComponent 是通过懒加载加载进来的，所以渲染页面的时候可能会有延迟，
// 但使用了 Suspense之后，在加载状态下，可以用<div>Loading...</div>作为loading效果
function demo () {
  return (
    <div>
    {/* Suspense 可以包裹多个懒加载组件 */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  )
}
 