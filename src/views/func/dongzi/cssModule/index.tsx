import React from "react";
import style from "./index.module.less";
import ss from "./index.less";
// 声明所有类型文件："E:\Project\reactpro\ExpectAdminPro\node_modules\vite\client.d.ts"
import { Alert } from "antd";

export default () => {
  function CSSModule() {
    const msgNode = (
      <div>
        <h2>
          <a
            href="http://www.ruanyifeng.com/blog/2016/06/css_modules.html"
            target="_black"
            style={{ textDecoration: "underline" }}
          >
            CSS Modules 用法教程
          </a>
        </h2>
      </div>
    );
    const descNode = (
      <div>
        <ul>
          <li>
            <pre>
              1、webpack配置css-loader：<span style={{ color: "#ff4747" }}>style-loader!css-loader?modules</span>
            </pre>
          </li>
          <li>
            <pre>
              2、index.css：<span style={{ color: "#ff4747" }}>{`.a {color: "#ff4747"}`}</span>
            </pre>
          </li>
          <li>
            <pre>
              3、导入CSS：<span style={{ color: "#ff4747" }}>{`import styles from "./index.css"`}</span>
            </pre>
          </li>
          <li>
            <pre>
              4、引用：<span style={{ color: "#ff4747" }}>{`<div className={style.a}></div>`}</span>
            </pre>
          </li>
        </ul>
      </div>
    );
    return <Alert message={msgNode} description={descNode} type="info" />;
  }
  function ReactCSSModule() {
    const msgNode = (
      <div>
        <h2>
          <a href="https://www.npmjs.com/package/react-css-modules" target="_blank" style={{ textDecoration: "underline" }}>
            react-css-modules 用法
          </a>
        </h2>
      </div>
    );
    const descNode = (
      <div>
        <ul>
          <li>
            <pre>
              1.webpack配置css-loader: <span style={{ color: "#ff4747" }}>style-loader!css-loader?modules</span>
            </pre>
          </li>
          <li>
            <pre>
              2.index.css: <span style={{ color: "#ff4747" }}> {`.a {color: #ff4747;}`} </span>
            </pre>
          </li>
          <li>
            <pre>
              3.导入CSS: <span style={{ color: "#ff4747" }}>import styles from './index.css'</span>
            </pre>
          </li>
          <li>
            <pre>
              4.导入react-css-modules: <span style={{ color: "#ff4747" }}>import CSSModules from 'react-css-modules'</span>
            </pre>
          </li>
          <li>
            <pre>
              5.包裹所需的组件：<span style={{ color: "#ff4747" }}>CSSModules(component, styles, [options])</span>
            </pre>
          </li>
          <li>
            <pre>
              4.引用：<span style={{ color: "#ff4747" }}>{'<div styleName="a"></div>'}</span>
            </pre>
          </li>
        </ul>
      </div>
    );
    return <Alert message={msgNode} description={descNode} type="info" />;
  }
  function Index_Modules_Less() {
    const msgNode = (
      <div>
        <h2>
          <a href="" target="_blank" style={{ textDecoration: "underline" }}>
            index.modules.less / index.modules.sass 模块化用法
          </a>
        </h2>
      </div>
    );
    let desc = "div的className命名：._cssApp_3ptzd_1";
    return <Alert message={msgNode} description={desc} type="info" />;
  }
  return (
    <div className={style.cssApp}>
      {CSSModule()}
      <br />
      {ReactCSSModule()}
      <br />
      {Index_Modules_Less()}
    </div>
  );
};
