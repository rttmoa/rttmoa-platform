import { Button, Card } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
const { Title } = Typography;
const BreadcrumbFlat: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <Title level={4} className="mb15">
        平级模式：/feat/breadcrumb/flat {"->"} /feat/breadcrumb/flatDetail
      </Title>
      <Button type="primary" icon={<SmileOutlined />} onClick={() => navigate("/feat/breadcrumb/flatDetail")}>
        打开详情页
      </Button>
    </Card>
  );
};

export default BreadcrumbFlat;
