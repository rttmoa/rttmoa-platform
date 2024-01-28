import React, { useEffect, useState } from "react";
import { Card, Badge, Button, Space, Tag, Table, message, Modal, Form, Input, Radio, Select, DatePicker } from "antd";
import { createUser, editUser, userList } from "@/api/modules/system/userManage";
import MultiForm from "@/components/multiForm";
import MultiTable from "@/components/multiTable";
interface stateConfig {
  [propName: number]: React.ReactNode;
}
interface InterestConfig {
  [propName: number]: string;
}

function pagination(data: any, callback: (page: number, pageSize: number) => void) {
  return {
    // 页码改变的回调，参数是改变后的页码及每页条数
    onChange: (page: any, pageSize: any) => {
      console.log("page change", page, pageSize);
      callback(page, pageSize);
    },
    onShowSizeChange: (current: any, size: any) => {
      console.log("pageSize 变化的回调", current, size);
    },
    // defaultCurrent: 1,
    // defaultPageSize: 10,
    hideOnSinglePage: true, // 只有一个隐藏分页器
    current: data.page,
    pageSize: data.page_size,
    pageSizeOptions: ["3", "5", "10", "15", "20", "30", "50"],
    total: data.total_count,
    showTotal: () => {
      return `共 ${data.total_count} 条`;
    },
    showQuickJumper: true,
    showSizeChanger: true
  };
}

const UserManage = () => {
  const [list, setList] = useState<any>({ list: [], pagination: {} });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedParams, setSelectedParams] = useState<any>({ selectedRowKeys: null, selectedIds: null, selectedItem: null });
  const [loading, setLoading] = useState(false);

  const [modalTitle, setModalTitle] = useState("");
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalUserInfo, setModalUserInfo] = useState({});

  const [searchFilter, setSearchFilter] = useState({});
  const [form] = Form.useForm();
  const [multiForm] = Form.useForm();

  // console.log(list.pagination.current = 3);
  // console.log("selectedParams", selectedParams);
  const getData = (page: number, pageSize: number) => {
    setLoading(true);
    setTimeout(() => {
      // console.log('最近', page, pageSize );
      userList({ page, pageSize }).then((res: any) => {
        // console.log("响应结果：", res);
        setLoading(false);
        const newData = res.data.list.map((item: any, index: number) => {
          return {
            ...item,
            key: index
          };
        });
        const resData = {
          ...res.data,
          page: page,
          page_size: pageSize,
          total_count: 130
        };
        setList({
          list: newData.splice(0, pageSize),
          pagination: pagination(resData, async (page: number, pageSize: number) => {
            setPage(page);
            setPageSize(pageSize);
            getData(page, pageSize);
          })
        });
      });
    }, 500);
  };
  useEffect(() => {
    getData(page, pageSize);
  }, []);
  // console.log('最新', page, pageSize );

  const updateSelectedItem = (selectedRowKeys: any, selectedRows: any, selectedIds: any) => {
    if (selectedIds) {
      setSelectedParams((state: any) => {
        return {
          ...state,
          selectedRowKeys,
          selectedIds: selectedIds,
          selectedItem: selectedRows
        };
      });
    } else {
      setSelectedParams((state: any) => {
        return {
          ...state,
          selectedRowKeys,
          selectedItem: selectedRows
        };
      });
    }
  };

  const columnConfig = [
    {
      title: "id",
      dataIndex: "id",
      width: "5%",
      fixed: "left"
    },
    {
      title: "用户名",
      dataIndex: "username",
      width: "6%",
      fixed: "left"
    },
    {
      title: "性别",
      dataIndex: "sex",
      render: (sex: number) => (sex === 1 ? "男" : "女")
      // width: "6%",
    },
    {
      title: "状态",
      dataIndex: "state",
      render: (state: number) => {
        let config: stateConfig = {
          1: <Tag color="green">痛苦</Tag>,
          2: <Tag color="blue">委屈</Tag>,
          3: <Tag color="orange">迷茫</Tag>,
          4: <Tag color="red">平淡</Tag>,
          5: <Tag color="purple">开心</Tag>
        };
        return config[state];
      }
      // width: "6%",
    },
    {
      title: "爱好",
      dataIndex: "interest",
      render: (interest: number) => {
        let config: InterestConfig = {
          1: "游泳",
          2: "打篮球",
          3: "踢足球",
          4: "跑步",
          5: "爬山",
          6: "骑行",
          7: "桌球",
          8: "麦霸"
        };
        return config[interest];
      }
      // width: "6%",
    },
    {
      title: "婚姻状态",
      dataIndex: "isMarried",
      render(isMarried: number) {
        return isMarried ? <Badge status="success" text="已婚" /> : <Badge status="error" text="未婚" />;
      }
      // width: "6%",
    },
    {
      title: "手机号",
      render() {
        let tele = 15303663375;
        let strTele = tele + ""; // 数字类型转字符串
        let phone = strTele.replace(/(\d{3})\d*(\d{4})/g, "$1***$2");
        return <span>{phone}</span>;
      }
    },
    {
      title: "身份证号",
      width: 150,
      render() {
        let identity = 231085199811011415n;
        let strIdentity = identity + ""; // 数字类型转字符串
        let res = strIdentity.replace(/(\d{3})\d*(\d{4})/g, "$1***********$2");
        return <span>{res}</span>;
      }
    },
    {
      title: "联系地址",
      dataIndex: "address",
      width: 250
    },
    {
      title: "邮箱",
      dataIndex: "email"
      // width: 250,
    },
    {
      title: "生日",
      dataIndex: "birthday"
      // width: "6%",
    },
    {
      title: "早起时间",
      dataIndex: "time"
      // width: "6%",
    },
    {
      title: "操作",
      fixed: "right",
      width: "12%",
      render(record: any) {
        return (
          <Space>
            <Button
              size="small"
              onClick={() => {
                handleOperator("detail", record);
              }}
            >
              详情
            </Button>
            <Button
              size="small"
              onClick={() => {
                handleOperator("edit", record);
              }}
            >
              编辑
            </Button>
            <Button
              size="small"
              onClick={() => {
                handleOperator("delete", record);
              }}
            >
              删除
            </Button>
          </Space>
        );
      }
    }
  ];
  // ! 操作员工： 新建、编辑、详情、删除  弹窗显示
  const handleOperator = (type: string, item: any) => {
    console.log("handleOperator", type, item);
    if (type === "create") {
      setModalIsVisible(true);
      setModalTitle("新建用户");
      setModalType(type);
    } else if (["edit", "detail"].includes(type)) {
      setModalTitle(type === "edit" ? "编辑用户" : "查看详情");
      setModalType(type);
      setModalUserInfo(item);
      setModalIsVisible(true);
    } else if (type === "delete") {
      message.success(`删除用户成功！ id：${item.id}`);
    } else if (type === "moreDelete") {
      message.success(`删除更多用户成功！ id：${JSON.stringify(selectedParams.selectedIds)}`);
    }
  };
  // ! 操作员工： 新建、编辑、详情、删除  弹窗内容提交
  const handleSubmit = () => {
    let type = modalType;
    let data = form.getFieldsValue();
    // console.log("handleSubmit data", data);
    let res = type === "create" ? createUser(data) : editUser(data);
    // 重新请求，根据页码等条件
  };
  const formList: any[] = [
    {
      type: "INPUT",
      label: "用户名",
      field: "user_name", // FIXME: 必传 唯一索引
      placeholder: "请输入用户名",
      initialValue: "",
      width: 80
    },
    {
      type: "INPUT",
      label: "联系地址",
      field: "address",
      placeholder: "请输入联系地址",
      initialValue: "",
      width: 80
    },
    {
      type: "SELECT",
      label: "婚姻状态",
      field: "isMarried",
      placeholder: "全部",
      initialValue: "0",
      width: 80,
      list: [
        { id: "0", name: "全部" },
        { id: "1", name: "未婚" },
        { id: "2", name: "已婚" }
      ]
    },
    {
      type: "SELECT",
      label: "性别",
      field: "sex",
      placeholder: "全部",
      initialValue: 3,
      width: 80,
      list: [
        { id: 3, name: "全部" },
        { id: 0, name: "女" },
        { id: 1, name: "男" }
      ]
    }
  ];
  const handleFilter = (filterParams = {}) => {
    console.log("父组件 filterParams", multiForm.getFieldsValue());
    setSearchFilter(filterParams);
    getData(page, pageSize);
  };
  const structure = (
    <div>
      <Card className="mb20">
        <MultiForm formList={formList} filterSubmit={handleFilter} multiForm={multiForm} />
      </Card>
      <Card
        className="mb30"
        extra={
          <Space size="large">
            <Button
              size="middle"
              onClick={() => {
                handleOperator("create", null);
              }}
            >
              新建
            </Button>
            <Button
              size="middle"
              onClick={() => {
                handleOperator("moreDelete", null);
              }}
            >
              多选删除
            </Button>
          </Space>
        }
        style={{ width: "100%" }}
      >
        <MultiTable
          rowSelection="checkbox"
          columns={columnConfig}
          dataSource={list.list}
          pagination={list.pagination}
          selectedRowKeys={selectedParams.selectedRowKeys}
          updateSelectedItem={updateSelectedItem}
          loading={loading}
          scroll={{ x: 1500 }}
        />
      </Card>
      <Modal
        width={800}
        title={modalTitle}
        open={modalIsVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setModalTitle("");
          setModalIsVisible(false);
          setModalType("");
          setModalUserInfo({});
        }}
      >
        <UserFormModal userInfo={modalUserInfo} type={modalType} form={form} />
      </Modal>
    </div>
  );

  return <>{structure}</>;
};

const UserFormModal: any = ({ userInfo, type, form }: any) => {
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 16 } };
  console.log("userInfo???", userInfo);

  useEffect(() => {
    return () => {
      form.resetFields(); // 组件卸载将清空Form值
    };
  });
  return (
    <>
      <Card>
        <Form
          form={form}
          layout="horizontal"
          {...formItemLayout}
          initialValues={{
            id: type === "create" ? null : userInfo.id,
            user_name: type === "create" ? null : userInfo.username,
            sex: type === "create" ? null : userInfo.sex,
            state: type === "create" ? null : userInfo["state"],
            // birthday: type === "create" ? null : userInfo.birthday,
            address: type === "create" ? null : userInfo.address
          }}
        >
          <Form.Item name="id" label="id">
            <Input type="text" disabled />
          </Form.Item>
          <Form.Item name="user_name" label="姓名">
            <Input type="text" placeholder="请输入姓名" disabled={type === "detail"} />
          </Form.Item>
          <Form.Item name="sex" label="性别">
            <Radio.Group disabled={type === "detail"}>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="state" label="状态">
            <Select disabled={type === "detail"}>
              <Select.Option value={1}>痛苦</Select.Option>
              <Select.Option value={2}>委屈</Select.Option>
              <Select.Option value={3}>迷茫</Select.Option>
              <Select.Option value={4}>平淡</Select.Option>
              <Select.Option value={5}>开心</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="birthday" label="生日">
            <DatePicker disabled={type === "detail"} />
          </Form.Item>
          <Form.Item name="address" label="联系地址">
            <Input.TextArea rows={3} disabled={type === "detail"} />
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default UserManage;
