/* eslint-disable react-hooks/rules-of-hooks */
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import { useEffect } from "react";

export default function highlightjs(props: any) {
  const content = props.code || "";
  // console.log(content);

  useEffect(() => {
    // 配置 highlight.js
    hljs.configure({
      // 忽略未经转义的 HTML 字符
      ignoreUnescapedHTML: true
    });
    // 获取到内容中所有的code标签
    const codes = document.querySelectorAll(".dg-html pre code");
    codes.forEach(el => {
      // 让code进行高亮
      hljs.highlightElement(el as HTMLElement);
    });
  }, []);

  // 只可渲染 pre code标签内容
  const content2 = `
		<pre>
			<code>console.log(abc)</code>
			<code>console.log(abc)</code>
		</pre>
		<h3>nihoa</h3>
		<pre>
			<code>console.log(abc);xxx.forEach(item=>{console.log(1)})</code>
		</pre>
	`;

  return (
    <div className="dg-html">
      Question
      <div dangerouslySetInnerHTML={{ __html: content2 }} />
    </div>
  );
}
