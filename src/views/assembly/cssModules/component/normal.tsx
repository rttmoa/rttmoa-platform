import { Alert } from "antd";
import React from "react";
import style from "./normal.less"; // 弃用
import style2 from "./normal.module.less";

export default function Normal() {
  return (
    <div>
      <Alert message={Message()} description={Description()} type="info" />
      <ul>
        <li className={style2.use}>CSSModule常规用法</li>
        <li className={style2.use}>CSSModule常规用法</li>
        <li className={style2.use}>CSSModule常规用法</li>
        <li className={style2.use}>CSSModule常规用法</li>
      </ul>
    </div>
  );
}

const Message = () => {
  return (
    <div>
      <h2>
        <a href="http://www.ruanyifeng.com/blog/2016/06/css_modules.html" target="_blank">
          CSSModules 用法
        </a>
      </h2>
    </div>
  );
};

const Description = () => {
  return (
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
            4.引用：<span style={{ color: "#ff4747" }}>{"<div className={style.a}></div>"}</span>
          </pre>
        </li>
      </ul>
    </div>
  );
};
