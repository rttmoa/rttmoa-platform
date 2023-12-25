/* eslint-disable react/display-name */
import { Card } from "antd";
// import CropperPro from "react-cropper-pro";

export default () => (
  <div>
    <Card title="CropperPro" bordered style={{ width: 500 }}>
      <h3>
        <a href="http://h5.dooring.cn/react-cropper-pro/" target="_balck">
          react-cropper-pro
        </a>
      </h3>
      <br />
      <br />
      {/* <CropperPro
        defaultImg="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F12%2F20200312090227_duUGc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694058406&t=7fdca6bbd9359b1982800dd643756ad7"
        onChange={(file: any) => console.log(file)}
        onDel={(image: string) => console.log("remove", image)}
      /> */}
      ;
    </Card>
  </div>
);
