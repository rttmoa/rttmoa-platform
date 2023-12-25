import React, { Component } from "react";

// 具体思路
//     ① 初始化计算容器的高度。截取初始化列表长度。这里我们需要div占位,撑起滚动条。

//     ② 通过监听滚动容器的 onScroll事件,根据 scrollTop 来计算渲染区域向上偏移量,
//         我们要注意的是，当我们向下滑动的时候，为了渲染区域，能在可视区域内，可视区域要向上的滚动;
//         我们向上滑动的时候，可视区域要向下的滚动。

//     ③ 通过重新计算的 end 和 start 来重新渲染列表。

// 性能优化点
//     ① 对于移动视图区域，我们可以用 transform 来代替改变 top值。

//     ② 虚拟列表实际情况，是有 start 或者 end 改变的时候，在重新渲染列表，所以我们可以用之前 shouldComponentUpdate 来调优，避免重复渲染。



let num = 0;
class Index extends React.Component {
  state = {
    list: new Array(999).fill(0).map(() => {
      num++;
      return num;
    }),
    scorllBoxHeight: 500 /* 容器高度(初始化高度) */,
    renderList: []       /* 渲染列表 */,
    itemHeight: 60       /* 每一个列表高度 */,
    bufferCount: 8       /* 缓冲个数 上下四个 */,
    renderCount: 0       /* 渲染数量 */,
    start: 0             /* 起始索引 */,
    end: 0               /* 终止索引 */,
  };
  listBox = null;
  scrollBox = null;
  scrollContent = null;
  componentDidMount() {
    const { itemHeight, bufferCount } = this.state;
    /* 计算容器高度 */
    console.log(this.listBox) // DOM
    const scorllBoxHeight = this.listBox.offsetHeight;
    const renderCount = Math.ceil(scorllBoxHeight / itemHeight) + bufferCount;
    const end = renderCount + 1;
    this.setState({
      scorllBoxHeight,
      end,
      renderCount,
    });
  }
  /* 处理滚动效果 */
  handerScroll = () => {
    const { scrollTop } = this.scrollBox;
    const { itemHeight, renderCount } = this.state;
    const currentOffset = scrollTop - (scrollTop % itemHeight);
    /* translate3d 开启css cpu 加速 */
    this.scrollContent.style.transform = `translate3d(0, ${currentOffset}px, 0)`;
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
    this.setState({
      start,
      end,
    });
  };
  /* 性能优化：只有在列表start 和 end 改变的时候在渲染列表 */
  shouldComponentUpdate(_nextProps, _nextState) {
    const { start, end } = _nextState;
    return start !== this.state.start || end !== this.state.end;
  }
  /* 处理滚动效果 */
  render() {
    console.log(1111);
    const { list, scorllBoxHeight, itemHeight, start, end } = this.state;
    const renderList = list.slice(start, end);
    return (
      <div className="list_box" ref={(node) => (this.listBox = node)}>
        <div
          style={{
            height: scorllBoxHeight,
            overflow: "scroll",
            position: "relative",
          }}
          ref={(node) => (this.scrollBox = node)}
          onScroll={this.handerScroll}
        >
          {/* 占位作用 - 否则无法滚动 */}
          <div
            style={{
              height: `${list.length * itemHeight}px`,
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
            }}
          />
          {/* 显然区 */}
          <div
            ref={(node) => (this.scrollContent = node)}
            style={{ position: "relative", left: 0, top: 0, right: 0 }}
          >
            {renderList.map((item, index) => (
              <div className="list" key={index}>
                第 {item + ""} Item
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Index;
