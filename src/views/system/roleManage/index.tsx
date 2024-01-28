import { Button, Card, Form, Modal, Space } from "antd";
import MultiTable from "@/components/multiTable";
import { useState } from "react";

function formateDate(time: string) {
  if (!time) return "";
  let date = new Date(time);
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
}

const RoleManage: React.FC = () => {
  const [isRoleVisible, setIsRoleVisible] = useState(false); // 创建角色的 Modal
  const [isPermVisible, setIsPermVisible] = useState(false);
  const [isUserVisible, setIsUserVisible] = useState(false);

  const [formRole] = Form.useForm(); // 创建的角色的 Form表单
  const [formPerm] = Form.useForm();
  const [formUser] = Form.useForm();

  const column = [
    {
      title: "角色iD",
      dataIndex: "id"
    },
    {
      title: "角色名称",
      dataIndex: "role_name"
    },
    {
      title: "使用状态",
      dataIndex: "status",
      render: (status: number) => {
        return status === 1 ? "启用" : "停用";
      }
    },
    {
      title: "授权人",
      dataIndex: "authorize_user_name"
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      render: formateDate
    },
    {
      title: "授权时间",
      dataIndex: "authorize_time",
      render: formateDate
    }
  ];

  return (
    <>
      <Card
        extra={
          <Space size="middle">
            <Button type="primary">创建角色</Button>
            <Button type="primary">设置权限</Button>
            <Button type="primary">用户授权</Button>
          </Space>
        }
      >
        <MultiTable columns={column} dataSource={[]} rowSelection={undefined} pagination={{}} />
      </Card>
      <Modal
        title="创建角色"
        open={isRoleVisible}
        // onOk={}
        // onCancel={}
      ></Modal>
      <Modal
        title="权限设置"
        open={isPermVisible}
        // onOk={}
        // onCancel={}
      ></Modal>
      <Modal
        title="用户授权"
        open={isUserVisible}
        // onOk={}
        // onCancel={}
      ></Modal>
    </>
  );
};

export default RoleManage;
