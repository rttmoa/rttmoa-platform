import React from 'react';

const ComponentsPicture = 
`import React, { Component } from "react";
import { Upload, message } from "antd";
import { upload, delUpload } from "../../api/upload";
import PubSub from "pubsub-js";

/**
 * 图片上传
 */
class PicturesWall extends Component {
  state = {
    fileList: [],
  };

  constructor(props) {
    super(props);
    //修改的时候显示图片
    let fileList = [];
    const { imgs } = this.props;
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img) => {
        return {
          url: img,
        };
      });
      this.state = { fileList };
    }
  }

  /***--- 上传之前的钩子函数 ---**/
  beforeUpload = (file) => {
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
      // console.log(res)
      if (res.status === 0) {
        this.setState({ fileList: [res.data, ...this.state.fileList] }, () => {
          //发布给form进行收集数据
          PubSub.publish("upload", this.state.fileList);
        });
      }
    });
    //屏蔽了action的默认上传
    return false;
  };

  /***--- 点击删除按钮的回调 ---**/
  onRemove = (file) => {
    //先删除后台图片，在删除前台图片
    delUpload({ name: file.name }).then((res) => {
      if (res.status === 0) {
        const { fileList } = this.state;
        //如果找到相等就返回其它的数据
        const newFileList = fileList.filter((item) => item.name !== file.name);
        //在重新写入state
        this.setState({ fileList: newFileList });
      }
    });
  };
  /***--- 图片预览事件 ---**/
  onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  render() {
    return (
      <Upload
        action=""
        accept="image/*" // 类型
        listType="picture-card"
        fileList={this.state.fileList}
        beforeUpload={this.beforeUpload}
        onPreview={this.onPreview}
        onRemove={this.onRemove}
      >
        {this.state.fileList.length < 5 && "+ Upload"}
      </Upload>
    );
  }
}

export default PicturesWall;`

export default ComponentsPicture;
