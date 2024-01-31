import React, { useEffect, useState } from "react";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";

export default function RichBraftEditor() {
  const [editorState, setEditorState] = useState<any>("");

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState("富文本初值") as any);
  }, []);
  // 富文本编辑器
  const handleEditorChange = (v: any) => {
    setEditorState(v);
  };
  return (
    <>
      <BraftEditor value={editorState} onChange={handleEditorChange} />
    </>
  );
}
