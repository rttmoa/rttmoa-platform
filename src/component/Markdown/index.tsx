/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import React from "react";
import marked from "marked";
import highlightJs from "highlight.js";
import IconSvg from "../../components/SvgIcon";
import "./index.less";
import "./iconfont";

type propTpye = {
  props: any;
  value: string | undefined;
};
type StateType = {
  val: string;
  html: string;
  link: string;
  linkMask: boolean;
};
interface Markdown {
  state: StateType;
  props: propTpye;
}
class Markdown extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      val: "",
      html: "",
      link: "",
      linkMask: false
    };
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true, //允许 Git Hub标准的markdown.
      // tables: true, //允许支持表格语法。该选项要求 gfm 为true。
      breaks: true, //允许回车换行。该选项要求 gfm 为true。
      pedantic: false, //尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
      // sanitize: true, //对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
      // smartLists: true, //使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
      // smartypants: false, //使用更为时髦的标点，比如在引用语法中加入破折号。
      // highlight: function (code: string) {
      //   return highlightJs.highlightAuto(code).value;
      // }
    });
  }
  componentWillMount() {
    this.setState(
      {
        val: this.props.value || ""
      },
      () => {
        this.renderHtml();
      }
    );
  }
  // 插入图片
  async insertImg(e: { target: { files: (string | Blob)[]; }; }) {
    let formData = new FormData(),
      img = "";
    formData.append("img", e.target.files[0]);
    try {
      // let data = await this.axios({
      //   method: "post",
      //   url: "http://localhost:3000/markdown_upload_img",
      //   data: formData
      // });
      // img = data.data.img;
    } catch (e) {
      console.log(e);
    }

    let val = `![图片描述](${img})`;
    this.setCursorPosition(this.refs.text, val, 6);
  }
  //插入链接
  insertLink() {
    this.setState(
      {
        linkMask: false,
        // link: this.refs.link['value']
      },
      () => {
        let val = `[链接描述](${this.state.link})`;
        this.setCursorPosition(this.refs.text, val, 5);
      }
    );
  }
  //插入代码块
  insertCode() {
    let val = `
\`\`\`

\`\`\``;
    this.setCursorPosition(this.refs.text, val, val.length - 4);
  }
  // 设置光标位置
  setCursorPosition(dom: any, val: any, posLen: any) {
    var cursorPosition = 0;
    if (dom.selectionStart) {
      cursorPosition = dom.selectionStart;
    }
    this.insertAtCursor(dom, val);
    dom.focus();
    dom.setSelectionRange(dom.value.length, cursorPosition + (posLen || val.length));
    this.setState({
      val: dom.value
    });
  }
  // 光标所在位置插入字符
  insertAtCursor(dom: any, val: any) {
    if (document.getSelection) {
      dom.focus();
      let sel: any;
      // sel = document.getSelection.createRange();
      sel = document.getSelection
      sel.text = val;
      sel.select();
    } else if (dom.selectionStart || dom.selectionStart == "0") {
      let startPos = dom.selectionStart;
      let endPos = dom.selectionEnd;
      let restoreTop = dom.scrollTop;
      dom.value = dom.value.substring(0, startPos) + val + dom.value.substring(endPos, dom.value.length);
      if (restoreTop > 0) {
        dom.scrollTop = restoreTop;
      }
      dom.focus();
      dom.selectionStart = startPos + val.length;
      dom.selectionEnd = startPos + val.length;
    } else {
      dom.value += val;
      dom.focus();
    }
  }
  handleInput(val: any) {
    this.setState(
      {
        val
      },
      () => {
        this.renderHtml();
      }
    );
  }

  renderHtml() {
    this.setState(
      {
        // html: marked(this.state.val)
      },
      () => {
        let { val, html } = this.state;
        // this.props.callback && this.props.callback({ markdown: val, html });
      }
    );
  }

  render() {
    return (
      <div id="markdowm">
        <div className="md-title">
          {/* 使用 JavaScript:; 被 # 替代 */}
          <ul className="cf">
            <li
              onClick={e => {
                this.setCursorPosition(this.refs.text, "****", 2);
              }}
            >
              <a href="#" title="粗体">
                <IconSvg name="bold" />
              </a>
            </li>
            <li
              onClick={e => {
                this.setCursorPosition(this.refs.text, "**", 1);
              }}
            >
              <a href="#" title="斜体">
                <IconSvg name="italic" />
              </a>
            </li>
            <li
              onClick={e => {
                this.setCursorPosition(this.refs.text, "# ", 2);
              }}
            >
              <a href="#" title="h1">
                h1
              </a>
            </li>
            <li
              onClick={e => {
                this.setCursorPosition(this.refs.text, "## ", 3);
              }}
            >
              <a href="#" title="h2">
                h2
              </a>
            </li>
            <li
              onClick={e => {
                this.setCursorPosition(this.refs.text, "### ", 4);
              }}
            >
              <a href="#" title="h3">
                h3
              </a>
            </li>
            <li
              onClick={e => {
                this.setCursorPosition(this.refs.text, "#### ", 5);
              }}
            >
              <a href="#" title="h4">
                h4
              </a>
            </li>
            <li
              onClick={e => {
                this.setCursorPosition(this.refs.text, "##### ", 6);
              }}
            >
              <a href="#" title="h5">
                h5
              </a>
            </li>
            <li
              onClick={e => {
                this.setCursorPosition(this.refs.text, "##### ", 7);
              }}
            >
              <a href="#" title="h6">
                h6
              </a>
            </li>
            <li
              onClick={e => {
                this.setCursorPosition(this.refs.text, "~~~~", 2);
              }}
            >
              <a href="#" title="中划线">
                <IconSvg name="strikethrough" />
              </a>
            </li>
            {/*<li onClick={e=>{this.setCursorPosition(this.refs.text, '<u></u>', 3)}}>
                            <a href="#" title="下划线"><IconSvg name="underline"/></a>
                        </li>
                        <li onClick={e=>{this.setCursorPosition(this.refs.text, '* ', 2)}}>
                            <a href="#" title="无序列表"><IconSvg name="unorderedlist"/></a>
                        </li>
                        <li onClick={e=>{this.setCursorPosition(this.refs.text, '1. ', 3)}}>
                            <a href="#" title="有序列表"><IconSvg name="orderedlist"/></a>
                        </li>*/}
            <li
              onClick={e => {
                this.setCursorPosition(this.refs.text, "> ", 2);
              }}
            >
              <a href="#" title="引用">
                <IconSvg name="quote" />
              </a>
            </li>
            <li>
              <a href="#" title="图片">
                <IconSvg name="image" />
              </a>
              <input type="file" className="uploadFile" />
            </li>
            <li
              onClick={e => {
                this.setState({
                  linkMask: true
                });
              }}
            >
              <a href="#" title="链接">
                <IconSvg name="link" />
              </a>
            </li>
            <li onClick={this.insertCode.bind(this)}>
              <a href="#" title="代码块">
                <IconSvg name="code" />
              </a>
            </li>
            <li
              onClick={e => {
                this.setCursorPosition(this.refs.text, "---", 1);
              }}
            >
              <a href="#" title="分割线">
                <IconSvg name="758bianjiqi_fengexian" />
              </a>
            </li>
          </ul>
        </div>
        <textarea
          ref="text"
          value={this.state.val}
          onChange={e => {
            this.handleInput(e.target.value);
          }}
        ></textarea>
        <div className="render fmt" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
        <div className="mask" style={{ display: this.state.linkMask ? "block" : "none" }}>
          <div className="link-text">
            <input type="text" ref="link" />
            <button onClick={this.insertLink.bind(this)}>确定</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Markdown;
