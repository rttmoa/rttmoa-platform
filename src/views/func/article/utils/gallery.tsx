import React from "react";
import { Card, Row, Col, Modal } from "antd";
import Viewer from "react-viewer";

/** #### 图片画廊  */
export default class Gallery extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      currentImg: "",
      baseUrl: props?.url // '/src/resource/ShareBikes/'
    };
  }

  openGallery = (imgSrc: string) => {
    this.setState({
      visible: true,
      currentImg: this.state.baseUrl + imgSrc
    });
  };

  render() {
    const modalProps = {
      title: "图片画廊",
      width: 1000,
      footer: false
    };
    const imgs = [
      ["1.png", "2.png", "3.png"],
      ["4.png", "5.png", "6.png"],
      ["7.png", "8.png", "9.png"],
      ["10.png", "11.png", "12.png"],
      ["13.png", "14.png", "15.png"],
      ["16.png", "17.png", "18.png"],
      ["19.png", "20.png", "21.png"]
    ];
    const viewerArr: any[] = []; // react-viewer 组件要的images=[]
    const imgList = imgs.map(list => {
      return list.map((item, index) => {
        // console.log(this.state.baseUrl + item);
        viewerArr.push({ src: this.state.baseUrl + item, alt: "" });
        return (
          <Card
            key={index}
            style={{ marginBottom: 20 }}
            cover={<img src={this.state.baseUrl + item} onClick={() => this.openGallery(item)} />}
          >
            {/* <Card.Meta title="React Admin" description="I Love Imooc" /> */}
          </Card>
        );
      });
    });
    // console.log(viewerArr);

    return (
      <div className="card-wrap">
        {/* // https://4x.ant.design/components/grid-cn/#Row  */}
        {imgList &&
          imgList.map((value, index) => {
            return (
              <Row gutter={10} key={index}>
                {imgList &&
                  imgList[index].map((value, index2) => {
                    return (
                      <Col span={8} key={index2}>
                        {imgList[index][index2]}
                      </Col>
                    );
                  })}
              </Row>
            );
          })}
        {/* <Modal {...modalProps} visible={this.state.visible} onCancel={() => {this.setState({ visible: false })}}>
					{<img src={this.state.currentImg} alt="" style={{ width: "100%" }} />}
				</Modal> */}
        {/* FIXME: Viewer use：https://github.com/infeng/react-viewer#readme */}
        <Viewer
          visible={this.state.visible}
          onClose={() => {
            this.setState({ visible: false });
          }}
          images={viewerArr}
        />
      </div>
    );
  }
}

/** #### 原Gallery  */
class GalleryDemo extends React.Component {
  state = {
    visible: false,
    currentImg: ""
  };

  openGallery = (imgSrc: string) => {
    this.setState({
      visible: true,
      currentImg: "/src/resource/galleryImages/" + imgSrc
    });
  };
  render() {
    const imgs = [
      ["1.png", "2.png", "3.png", "4.png", "5.png"],
      ["6.png", "7.png", "8.png", "9.png", "10.png"],
      ["11.png", "12.png", "13.png", "14.png", "15.png"],
      ["16.png", "17.png", "18.png", "19.png", "20.png"],
      ["21.png", "22.png", "23.png", "24.png", "25.png"]
    ];
    const imgList = imgs.map(list =>
      list.map((item, index) => (
        <Card
          key={index}
          style={{ marginBottom: 20 }}
          cover={<img src={"/src/resource/galleryImages/" + item} onClick={() => this.openGallery(item)} />}
        >
          {/* <Card.Meta title="React Admin" description="I Love Imooc" /> */}
        </Card>
      ))
    );
    return (
      <div className="card-wrap">
        <Row gutter={10}>
          <Col md={5}>{imgList[0]}</Col>
          <Col md={5}>{imgList[1]}</Col>
          <Col md={5}>{imgList[2]}</Col>
          <Col md={5}>{imgList[3]}</Col>
          <Col md={4}>{imgList[4]}</Col>
        </Row>
        <Modal
          width={300}
          visible={this.state.visible}
          title="图片画廊"
          footer={null}
          onCancel={() => {
            this.setState({ visible: false });
          }}
        >
          {<img src={this.state.currentImg} alt="" style={{ width: "100%" }} />}
        </Modal>
      </div>
    );
  }
}
