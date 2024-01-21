import React, { useEffect, useState } from "react";
import { Editor, EditorState, RawDraftContentState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./index.less";

export default function Draft({ callback }: any) {
  const [editorContent, setEditorContent] = useState<any>("");
  const [contentState, setContentState] = useState(null);
  const [editorState, setEditorState] = useState<any>("");
  useEffect(() => {
    return () => {
      setEditorContent("");
      setContentState(null);
      setEditorState("");
    };
  }, []);
  useEffect(() => {}, [editorState]);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };
  const imageUploadCallBack = (file: unknown) => {
    return new Promise((reslove, reject) => {
      console.log(file);
      setTimeout(() => {
        reslove(file);
      }, 1000);
    });
  };
  const onEditorChange = (editorParams: RawDraftContentState) => {
    setEditorContent(editorParams);
    callback && callback({ content: editorContent });
  };
  return (
    <div id="draft">
      <Editor
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
        placeholder="@某人哦！"
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
      />
    </div>
  );
}
