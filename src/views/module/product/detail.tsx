import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button, message, Upload, UploadFile, FormInstance } from "antd";
import Icon from "@ant-design/icons";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UploadChangeParam } from "antd/es/upload";
import { listApi, listProps } from ".";
import defaultImg from "@/assets/images/defaultImg.jpg";

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

const serverUrl = "http://localhost:3009";

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // const { getFieldDecorator } = props.form;
  const [currentData, setCurrentData] = useState<any>({});
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState<any>("");

  // 初始化的时候执行
  useEffect(() => {
    const _id = location.search.split("=")[1];
    if (_id) {
      listApi.then((res: listProps) => {
        const result = res.list.filter((value: listProps["list"]) => value._id === _id);
        // console.log(result);
        setCurrentData(result[0]);
        setImageUrl(result[0].coverImg);
        setEditorState(BraftEditor.createEditorState(result[0].content) as any);
      });
    } else {
      setCurrentData({ name: " " });
    }
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
    setEditorState(v);
  };

  const onFinish = (values: any) => {
    // editorState.toHTML()获取当前富文本的内容
    // console.log(editorState.toHTML());
    console.log(values); // {name: 'zhangsan', price: '444'}

    // e.preventDefault()
    // props.form.validateFieldsAndScroll((err, values) => {}

    // ? 判断是编辑 还是新建，做对应的操作
    const _id = location.search.split("=")[1];
    // if (_id) {
    //   modifyOne(_id, {
    //     ...values,
    //     coverImg: imageUrl,
    //     content: editorState.toHTML()
    //   });
    // } else {
    //   createApi({
    //     ...values,
    //     coverImg: imageUrl,
    //     content: editorState.toHTML()
    //   })
    //     .then(res => {
    //       navigate("/list/curd/product");
    //       setCurrentData({});
    //       setImageUrl("");
    //       setLoading(false);
    //       setEditorState("");
    //     })
    //     .catch(err => { console.log(err); });
    // }
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  };

  if (!currentData?.name) return;
  return (
    <Card
      title="商品编辑"
      extra={
        <Button
          onClick={() => {
            navigate("/list/curd/product");
          }}
        >
          返回
        </Button>
      }
    >
      <Form
        // {...layout}
        name="control-hooks"
        onFinish={onFinish}
        // style={{ maxWidth: 600 }}
        initialValues={{ name: currentData.name, price: currentData.price }}
      >
        <Form.Item name="name" label="名字" rules={[{ required: true, message: "请输入商品名字" }]}>
          <Input placeholder="请输入商品名字" />
        </Form.Item>

        <Form.Item name="price" label="价格" rules={[{ required: true, message: "请输入商品价格" }]}>
          <Input placeholder="请输入商品价格" />
        </Form.Item>

        <Form.Item label="主图">
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={true}
            action={serverUrl + "/api/v1/common/file_upload"}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={serverUrl + imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              // <div>
              //   <Icon type={loading ? "loading" : "plus"} />
              //   <div className="ant-upload-text">Upload</div>
              // </div>
              <img src={defaultImg} alt="avatar" style={{ width: "100%" }} />
            )}
          </Upload>
        </Form.Item>

        <Form.Item label="详情: ">
          <BraftEditor value={editorState} onChange={handleEditorChange} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Edit;
