import React, { ForwardedRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import echarts, { ECOption } from "./config";
import { ECElementEvent, EChartsType } from "echarts";
import { useDebounceFn, useTimeout } from "ahooks";
import { useSelector } from "@/redux";
import { RootState } from "@/redux";

export interface EChartProps {
  option: ECOption | null | undefined;
  isResize?: boolean;
  width?: number | string;
  height?: number | string;
  onClick?: (event: ECElementEvent) => any;
}

export interface EChartsRef {
  instance(): EChartsType | undefined;
}

type resultType = React.ForwardRefRenderFunction<EChartsRef, EChartProps>;

const EChartInner: resultType = ({ option, isResize = true, width, height, onClick }, ref: ForwardedRef<EChartsRef>) => {
  const cRef = useRef<HTMLDivElement>(null);
  const cInstance = useRef<EChartsType>();
  const [isFirstRun, setIsFirstRun] = useState(true);

  const maximize = useSelector((state: RootState) => state.global.maximize);
  const menuSplit = useSelector((state: RootState) => state.global.menuSplit);
  const isCollapse = useSelector((state: RootState) => state.global.isCollapse);

  const handleClick = (event: ECElementEvent) => onClick && onClick(event);

  useEffect(() => {
    if (cRef.current) {
      // console.log(cRef.current.getBoundingClientRect().top);
      cInstance.current = echarts.getInstanceByDom(cRef.current) as unknown as ReturnType<EChartsRef["instance"]>;
      console.log(cInstance.current);
      if (!cInstance.current) {
        console.log("初始化 cInstance");
        cInstance.current = echarts.init(cRef.current, undefined, { renderer: "svg" }) as unknown as ReturnType<
          EChartsRef["instance"]
        >;
        cInstance.current?.on("click", handleClick);
      }
      option && cInstance.current?.setOption(option);
    }
  }, [cRef, option]);

  // 调整窗口大小 设置Echarts延迟动画效果
  const { run } = useDebounceFn(
    () => {
      return cInstance.current?.resize({ animation: { duration: 300 } });
    },
    { wait: 300 }
  );

  useTimeout(() => {
    setIsFirstRun(false);
  }, 1000);

  // useEffect 是异步执行的，而useLayoutEffect是同步执行的。
  // useEffect 的执行时机是浏览器完成渲染之后，而 useLayoutEffect 的执行时机是浏览器把内容真正渲染到界面之前，和 componentDidMount 等价。
  useLayoutEffect(() => {
    if (isResize && !isFirstRun) run();
  }, [width, height, run, isFirstRun, maximize, menuSplit, isCollapse]);

  useEffect(() => {
    if (!isResize) return;
    window.addEventListener("resize", run);
    return () => {
      window.removeEventListener("resize", run);
    };
  }, [run]);

  // 父组件绑定子组件 ref
  useImperativeHandle(ref, () => ({ instance: () => cInstance.current }));

  const echartsStyle = useMemo(
    () => (width || height ? { height, width } : { height: "100%", width: "100%", flex: 1 }),
    [width, height]
  );

  console.log("-");
  return <div ref={cRef} style={echartsStyle} />;
};

const ECharts = React.memo(React.forwardRef(EChartInner));
export default ECharts;
