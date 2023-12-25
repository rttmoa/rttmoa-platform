// date: 2023-08-10
// React 中使用 highlight.js 和 Clipboard.js 实现代码块和复制功能: http://www.dtmao.cc/php/94650.html
import hljs from "highlight.js/lib/core";

// 导入需要的语言高亮
import javascript from "highlight.js/lib/languages/javascript";
// import java from 'highlight.js/lib/languages/java';
// import csharp from 'highlight.js/lib/languages/csharp';
// import php from 'highlight.js/lib/languages/php';
// import python from 'highlight.js/lib/languages/python';
// import objectivec from 'highlight.js/lib/languages/objectivec';
// import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage("javascript", javascript);
// hljs.registerLanguage('java', java);
// hljs.registerLanguage('csharp', csharp);
// hljs.registerLanguage('php', php);
// hljs.registerLanguage('python', python);
// hljs.registerLanguage('objectivec', objectivec);
// hljs.registerLanguage('bash', bash);

export default hljs;
