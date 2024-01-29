import { Button, Card, Form, Modal, Space } from "antd";
import MultiTable from "@/components/multiTable";
import { useEffect, useState } from "react";
import { roleList } from "@/api/modules/system/roleManage";

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

  const [rolelist, setRolelist] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  // 获取角色列表
  useEffect(() => {
    (async function () {
      roleList().then((result: any) => {
        console.log(result);
        const list = result.data.list.map((item: any, i: number) => ({ ...item, key: i }));
        setRolelist(list);
      });
    })();
  }, []);

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

  const updateSelectedItem = (selectedRowKeys: any, selectedRows: any, selectedIds: any) => {
    if (selectedIds) {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedIds(selectedIds);
      setSelectedItem(selectedRows);
    } else {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedItem(selectedRows);
    }
  };

  // 弹窗：角色创建
  const createRoleBtn = () => {
    console.log("创建角色按钮");
    setIsRoleVisible(true);
  };
  // 弹窗：角色提交
  const createRoleSubmit = () => {};
  // 弹窗：设置权限
  const setPermBtn = () => {};
  // 弹窗：权限提交
  const setPermSubmit = () => {};
  // 弹窗：用户授权
  const userPermBtn = () => {};
  const userPermSubmit = () => {};

  return (
    <>
      <Card
        extra={
          <Space size="middle">
            <Button type="primary" onClick={createRoleBtn}>
              创建角色
            </Button>
            <Button type="primary" onClick={setPermBtn}>
              设置权限
            </Button>
            <Button type="primary" onClick={userPermBtn}>
              用户授权
            </Button>
          </Space>
        }
      >
        <MultiTable
          columns={column}
          dataSource={rolelist}
          selectedRowKeys={selectedRowKeys}
          selectedIds={selectedIds}
          selectedItem={selectedItem}
          pagination={{}}
          updateSelectedItem={updateSelectedItem}
        />
      </Card>
      <Modal
        title="创建角色"
        open={isRoleVisible}
        // onOk={}
        onCancel={() => {
          setIsRoleVisible(false);
        }}
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
