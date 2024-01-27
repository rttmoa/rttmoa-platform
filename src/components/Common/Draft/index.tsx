import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./index.less";

const Draft: React.FC = () => {
  const [editorState, setEditorState] = useState<any>("");
  const [editorContent, setEditorContent] = useState<any>("");

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };
  const imageUploadCallBack = (file: File) => {
    return new Promise((resolve, reject) => {
      console.log(file);
      setTimeout(() => {
        resolve(file);
      }, 1000);
    });
  };
  const onEditorChange = (editorContent: any) => {
    // todo setState第二个参数使用：设置state、传递父组件
    // this.setState({ editorContent }, () => {
    //   this.props.callback && this.props.callback({ editorContent })
    // });
    setEditorContent({ editorContent });
    // todo 回调父组件 editorContent
  };

  return (
    <div className="draft">
      {/* <Editor
        editorState={editorState}
        toolbarClassName="draft-toolbar"
        wrapperClassName="draft-wrapper"
        editorClassName="draft-editor"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          history: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          image: { uploadCallback: imageUploadCallBack }
        }}
        onContentStateChange={onEditorChange}
        placeholder="@某人哦！！"
        spellCheck
        onFocus={() => {
          console.log("focus");
        }}
        onBlur={() => {
          console.log("blur");
        }}
        onTab={() => {
          console.log("tab");
          return true;
        }}
        localization={{ locale: "zh", translations: { "generic.add": "Add" } }}
        mention={{
          separator: " ",
          trigger: "@",
          caseSensitive: true,
          suggestions: [
            { text: "A", value: "AB", url: "href-a" },
            { text: "AB", value: "ABC", url: "href-ab" },
            { text: "ABC", value: "ABCD", url: "href-abc" },
            { text: "ABCD", value: "ABCDDDD", url: "href-abcd" },
            { text: "ABCDE", value: "ABCDE", url: "href-abcde" },
            { text: "ABCDEF", value: "ABCDEF", url: "href-abcdef" },
            { text: "ABCDEFG", value: "ABCDEFG", url: "href-abcdefg" }
          ]
        }}
      /> */}
    </div>
  );
};
export default Draft;
