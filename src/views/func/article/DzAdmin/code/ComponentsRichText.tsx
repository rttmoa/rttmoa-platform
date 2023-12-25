import React from 'react';

const ComponentsRichText =
`import React, { Component } from "react";
import { message, Upload } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils";
import "braft-editor/dist/index.css";
import { upload } from "../../api/upload";
import PubSub from "pubsub-js";

/***
 * 富文本
 */
class RichTextEditor extends Component {
  state = {
    editorState: null,
  };

  async componentDidMount() {
    // 这里假设从服务器获取html格式的编辑器内容
    const htmlContent = this.props.detail;
    // 使用 BraftEditor.createEditorState 将 html 字符串转换为编辑器所需的 editorState 数据
    this.setState({
      editorState: BraftEditor.createEditorState(htmlContent),
    });
  }

  // 当编辑器获得焦点时按 ctrl + s 将执行的事件
  submitContent = async () => {
    // 在编辑器内容提交到服务器之前，可以直接调用editorState.toHTML()获取HTML内容
    const htmlContent = this.state.editorState.toHTML();
    PubSub.publish("rich-text", htmlContent);
  };

  //富文本内容改变触发的事件
  handleEditorChange = (editorState) => {
    this.setState({ editorState }, () => {
      PubSub.publish("rich-text", this.state.editorState.toHTML());
    });
  };

  //点击预览功能的回调
  preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }

    window.previewWindow = window.open();
    window.previewWindow.document.write(this.buildPreviewHtml());
    window.previewWindow.document.close();
  };

  //上传图片的回调
  uploadHandler = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/gif";
    if (!isJpgOrPng) {
      message.error("请上传格式为png, gif, jpg, jpeg的图片");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return false;
    }
    let fd = new FormData();
    fd.append("image", file); //传文件
    upload(fd).then((res) => {
      if (res.status === 0) {
        //写入富文本种
        this.setState({
          editorState: ContentUtils.insertMedias(this.state.editorState, [
            {
              type: "IMAGE",
              url: res.data.url,
            },
          ]),
        });
      }
    });
    //屏蔽了action的默认上传
    return false;
  };

  buildPreviewHtml() {
    return "
		<!Doctype html>
		<html>
			<head>
				<title>Preview Content</title>
				<style>
					html,body{
						height: 100%;
						margin: 0;
						padding: 0;
						overflow: auto;
						background-color: #f1f2f3;
					}
					.container{
						box-sizing: border-box;
						width: 1000px;
						max-width: 100%;
						min-height: 100%;
						margin: 0 auto;
						padding: 30px 20px;
						overflow: hidden;
						background-color: #fff;
						border-right: solid 1px #eee;
						border-left: solid 1px #eee;
					}
					.container img,
					.container audio,
					.container video{
						max-width: 100%;
						height: auto;
					}
					.container p{
						white-space: pre-wrap;
						min-height: 1em;
					}
					.container pre{
						padding: 15px;
						background-color: #f1f1f1;
						border-radius: 5px;
					}
					.container blockquote{
						margin: 0;
						padding: 15px;
						background-color: #f1f1f1;
						border-left: 3px solid #d1d1d1;
					}
				</style>
			</head>
			<body>
				<div class="container">{this.state.editorState.toHTML()}</div>
			</body>
		</html>
		";
  }

  render() {
    //自定义组件,集成antd的上传图片组件和预览
    const extendControls = [
      {
        key: "custom-button",
        type: "button",
        text: "预览",
        onClick: this.preview,
      }, //antd的上传图片组件
      {
        key: "antd-uploader",
        type: "component",
        component: (
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={this.uploadHandler}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              <PictureOutlined />
            </button>
          </Upload>
        ),
      },
    ];

    const { editorState } = this.state;
    return (
      <BraftEditor
        extendControls={extendControls}
        value={editorState}
        onChange={this.handleEditorChange}
        onSave={this.submitContent}
        contentStyle={{ height: 400, border: "1px solid #cccccc" }}
        placeholder={"请输入文本"}
      />
    );
  }
}

export default RichTextEditor;`

export default ComponentsRichText;
