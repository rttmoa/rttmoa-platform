import { Button, Card } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
const { Title } = Typography;
const BreadcrumbChildren: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <Title level={4} className="mb15">
        层级模式：/feat/breadcrumb/children {"->"} /feat/breadcrumb/children/detail
      </Title>
      <Button type="primary" icon={<SmileOutlined />} onClick={() => navigate("/feat/breadcrumb/children/detail")}>
        打开详情页
      </Button>
    </Card>
  );
};

export default BreadcrumbChildren;
