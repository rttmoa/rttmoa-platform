// date: 2023-08-10
// React 中使用 highlight.js 和 Clipboard.js 实现代码块和复制功能: http://www.dtmao.cc/php/94650.html
import React, { useEffect, useRef, useState } from "react";
import hljs from "./highlightjs";
import Clipboard from "clipboard";
import "highlight.js/styles/atom-one-dark.css"; // 好多css可选
// import "highlight.js/styles/a11y-dark.css";
// import "highlight.js/styles/github-dark.css";

// TODO: 参考：https://dzblog.cn/article/60dc33e718dbe9391712042a
export default function CodeBlock({ language, code }: any) {
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preRef.current) {
      hljs.highlightBlock(preRef.current);

      // 创建 clipboard 实例并保存到变量中
      const clipboard = new Clipboard(`#${language}copy_btn`, {
        text: () => code
      });

      // 监听复制成功事件
      clipboard.on("success", () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });

      // 销毁 clipboard 实例
      return () => {
        clipboard.destroy();
      };
    }
  }, [code]);

  return (
    <div className="code-block" style={{ position: "relative", marginTop: 8 }}>
      <pre>
        <code id={language} ref={preRef} className={language}>
          {code}
        </code>
      </pre>
      <button
        id={`${language}copy_btn`}
        style={{ position: "absolute", top: 4, right: 4, lineHeight: "14px" }}
        className="code-block__button"
        data-clipboard-target={`#${language}`}
        disabled={!preRef.current}
      >
        {copied ? "已复制" : "复制"}
      </button>
    </div>
  );
}
