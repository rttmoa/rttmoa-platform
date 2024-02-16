// import React, { useEffect, useState } from "react";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// export default function RichTextEditor({ detail }: any) {
//   const [editorState, seteditorState] = useState(() => EditorState.createEmpty());

//   useEffect(() => {
//     if (detail) {
//       // 如果有值, 根据html格式字符串创建一个对应的编辑对象
//       const contentBlock = htmlToDraft(detail);
//       const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
//       const editorState = EditorState.createWithContent(contentState);
//       seteditorState(editorState);
//     } else {
//       seteditorState(EditorState.createEmpty()); // 创建一个没有内容的编辑对象
//     }
//   }, []);

//   /**
//    * 给父组件ref调用使用
//    * @returns
//    */
//   const getDetail = () => {
//     // 返回输入数据对应的html格式的文本
//     return draftToHtml(convertToRaw(editorState.getCurrentContent()));
//   };

//   /**
//    * 输入过程中实时的回调
//    * @param editorState
//    */
//   const onEditorStateChange = (editorState: any) => {
//     console.log("onEditorStateChange()");
//     seteditorState(editorState);
//   };

//   const uploadImageCallBack = (file: any) => {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", "/manage/img/upload");
//       const data = new FormData();
//       data.append("image", file);
//       xhr.send(data);
//       xhr.addEventListener("load", () => {
//         const response = JSON.parse(xhr.responseText);
//         const url = response.data.url; // 得到图片的url
//         resolve({ data: { link: url } });
//       });
//       xhr.addEventListener("error", () => {
//         const error = JSON.parse(xhr.responseText);
//         reject(error);
//       });
//     });
//   };
//   return (
//     <Editor
//       editorState={editorState}
//       editorStyle={{ border: "1px solid black", width: "100%", minHeight: 200, paddingLeft: 10 }}
//       onEditorStateChange={onEditorStateChange}
//       toolbar={{
//         image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } }
//       }}
//     />
//   );
// }
