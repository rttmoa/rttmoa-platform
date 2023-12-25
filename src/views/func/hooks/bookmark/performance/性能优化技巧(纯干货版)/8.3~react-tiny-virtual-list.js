
// 为了防止大量dom存在影响性能，我们只对，渲染区和缓冲区的数据做渲染，，虚拟列表区 没有真实的dom存在。 
// 缓冲区的作用就是防止快速下滑或者上滑过程中，会有空白的现象

// react-tiny-virtual-list 是一个较为轻量的实现虚拟列表的组件
import React from 'react';
import {render} from 'react-dom';
import VirtualList from 'react-tiny-virtual-list';
 
const data = ['A', 'B', 'C', 'D', 'E', 'F', ...];
 
render(
  <VirtualList
    width='100%'
    height={600}
    itemCount={data.length}
    itemSize={50} // Also supports variable heights (array or function getter)
    renderItem={({index, style}) =>
      <div key={index} style={style}> // The style property contains the item's absolute position
        Letter: {data[index]}, Row: #{index}
      </div>
    }
  />,
  document.getElementById('root')
);