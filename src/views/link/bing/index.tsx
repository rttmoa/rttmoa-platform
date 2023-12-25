import { Card } from "antd";
import "./index.less";

const Bing: React.FC = () => {
  return (
    <Card className="content">
      <iframe src="https://cn.bing.com/" className="full-iframe"></iframe>
    </Card>
  );
};

export default Bing;
