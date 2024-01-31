import { Modal, Upload, message } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import React, { useEffect, useState } from "react";
const serverUrl = "http://localhost:5000/upload/";

export default function PicturesWall({ images }: any) {
  const [previewVisible, setpreviewVisible] = useState(false); // 图片弹窗
  const [previewImage, setpreviewImage] = useState(""); // 大图的url
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const imgs = images;
    console.log(imgs);
    if (imgs && imgs.length > 0) {
      let fileList = [];
      fileList = imgs.map((img: any, index: number) => ({
        uid: -index,
        name: img,
        status: "done",
        // url: serverUrl + img
        url: img
      }));
      setFileList(fileList);
    }
  }, []);

  /**
   * 父组件获取此值
   * @returns
   */
  const getImgs = () => this.state.fileList.map((file: any) => file.name);

  const handlePreview = (file: any) => {
    setpreviewImage(file.url || file.thumbUrl);
    setpreviewVisible(true);
  };

  const handleChange: UploadProps["onChange"] = ({ file, fileList }: any) => {
    console.log("上传事件：", file, file.status, fileList.length, file === fileList[fileList.length - 1]);
    setFileList(fileList);

    // 一旦上传成功, 将当前上传的file的信息修正(name, url)
    // if (file.status === "done") {
    //   const result = file.response; // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
    //   if (result.status === 0) {
    //     message.success("上传图片成功!");
    //     const { name, url } = result.data;
    //     file = fileList[fileList.length - 1];
    //     file.name = name;
    //     file.url = url;
    //   } else {
    //     message.error("上传图片失败");
    //   }
    // } else if (file.status === "removed") {
    // 删除图片
    //   const result = await reqDeleteImg(file.name);
    //   if (result.status === 0) {
    //     message.success("删除图片成功!");
    //   } else {
    //     message.error("删除图片失败!");
    //   }
    // }
    // 在操作(上传/删除)过程中更新fileList状态
    //setFileList(fileList);
  };
  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" /*上传图片的接口地址*/
        accept="image/*" /*只接收图片格式*/
        name="image" /*请求参数名*/
        listType="picture-card" /*卡片样式*/
        fileList={fileList} /*所有已上传图片文件对象的数组*/
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 4 ? null : (
          <div>
            <div>+</div>
            <div>Upload</div>
          </div>
        )}
      </Upload>
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => {
          setpreviewVisible(false);
        }}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
  // return (
  //   <>
  //     <Upload
  //       name="file"
  //       listType="picture-card"
  //       className="avatar-uploader"
  //       showUploadList={true}
  //       action={serverUrl + "/api/v1/common/file_upload"}
  //       onChange={handleChange}
  // 			fileList={fileList}
  //     >
  //       {imageUrl ? (
  // <img src={serverUrl + imageUrl} alt="avatar" style={{ width: "100%" }} />
  //         <img src={imageUrl} alt="avatar" style={{ width: 100, height: 100 }} />
  //       ) : (
  // <div>
  //   <Icon type={loading ? "loading" : "plus"} />
  //   <div className="ant-upload-text">Upload</div>
  // </div>
  // <img src={defaultImg} alt="avatar" style={{ width: "100%" }} />
  //         <span>+</span>
  //       )}
  //     </Upload>
  //   </>
  // );
}
