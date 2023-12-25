import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button, message, Upload, UploadFile, FormInstance } from "antd";
// 引入编辑器组件
import BraftEditor, { EditorState } from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UploadChangeParam } from "antd/es/upload";

// export interface FormInstance<Values = any> {
//   getFieldValue: (name: NamePath) => StoreValue;
//   getFieldsValue: (() => Values) &
//     ((nameList: NamePath[] | true, filterFunc?: FilterFunc) => any) &
//     ((config: GetFieldsValueConfig) => any);
//   getFieldError: (name: NamePath) => string[];
//   getFieldsError: (nameList?: NamePath[]) => FieldError[];
//   getFieldWarning: (name: NamePath) => string[];
//   isFieldsTouched: ((nameList?: NamePath[], allFieldsTouched?: boolean) => boolean) & ((allFieldsTouched?: boolean) => boolean);
//   isFieldTouched: (name: NamePath) => boolean;
//   isFieldValidating: (name: NamePath) => boolean;
//   isFieldsValidating: (nameList: NamePath[]) => boolean;
//   resetFields: (fields?: NamePath[]) => void;
//   setFields: (fields: FieldData[]) => void;
//   setFieldValue: (name: NamePath, value: any) => void;
//   setFieldsValue: (values: RecursivePartial<Values>) => void;
//   validateFields: ValidateFields<Values>;
//   submit: () => void;
// }
function Edit() {
  const navigate = useNavigate();
  const loc = useLocation();
  const _id = loc.search.split("=")[1];
  // console.log(_id);

  // const { getFieldDecorator } = props.form;
  const [currentData, setCurrentData] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState("");

  // 初始化的时候执行
  useEffect(() => {
    // if (props.match.params.id) {
    //   getOneById(props.match.params.id).then(res => {
    //     setCurrentData(res);
    //     setImageUrl(res.coverImg);
    //     setEditorState(BraftEditor.createEditorState(res.content));
    //   });
    // }
  }, []);

  // 图片上传
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    // console.log(info);return;
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // 上传成功
      // Get this url from response in real world.
      setLoading(false);
      // console.log(info);
      setImageUrl(info.file.response.info);
    }
  };

  // 富文本编辑器
  const handleEditorChange = (v: any) => {
    // setEditorState(v);
  };

  const onFinish = (value: any) => {
    // editorState.toHTML()获取当前富文本的内容
    // console.log(editorState.toHTML());
    console.log(value); // {name: 'zhangsan', price: '444'}
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  return (
    <Card
      title="商品编辑"
      extra={
        <Button
          onClick={() => {
            navigate("/func/qf/product/list");
          }}
        >
          返回
        </Button>
      }
    >
      <Form {...layout} name="control-hooks" onFinish={onFinish} style={{ maxWidth: 600 }}>
        <Form.Item
          name="name"
          label="名字"
          rules={[{ required: true, message: "请输入商品名字" }]}
          // initialValue={currentData?.name}
        >
          <Input placeholder="请输入商品名字" />
        </Form.Item>

        <Form.Item
          name="price"
          label="价格"
          rules={[{ required: true, message: "请输入商品价格" }]}
          // initialValue={currentData.price}
        >
          <Input placeholder="请输入商品价格" />
        </Form.Item>

        <Form.Item label="主图">
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={true}
            action={"/api/v1/common/file_upload"}
            onChange={info => handleChange(info)}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                {/* <Icon type={loading ? "loading" : "plus"} /> */}
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item label="详情 （富文本）">
          {/* <BraftEditor value={editorState} onChange={e => handleEditorChange(e)} /> */}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Edit;
