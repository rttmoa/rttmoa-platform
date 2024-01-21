import { Alert } from "antd";

export default function Normal() {
  return (
    <div>
      <Alert message={Message()} description={Description()} type="info" />
      {/* <ul>
        <li className={style2.use}>CSSModule常规用法</li>
        <li className={style2.use}>CSSModule常规用法</li>
        <li className={style2.use}>CSSModule常规用法</li>
        <li className={style2.use}>CSSModule常规用法</li>
      </ul> */}
    </div>
  );
}

const Message = () => {
  return (
    <div>
      <h2>
        <a href="https://www.npmjs.com/package/react-css-modules" target="_blank">
          react-css-modules 用法
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
            6.引用：<span style={{ color: "#ff4747" }}>{'<div styleName="a"></div>'}</span>
          </pre>
        </li>
        <li>
          <pre>
            7.举例：
            <span style={{ color: "#ff4747" }}>
              {"const CssModuleReactCSSModule = CSSModules(Component, styles, {allowMultiple: true})"}
            </span>
          </pre>
        </li>
      </ul>
    </div>
  );
};
