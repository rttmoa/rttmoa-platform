import React, { useEffect, useState } from "react";
import { roleList } from "@/api/modules/system/roleManage";
import {
  fetchChangeUserStatus,
  fetchUserDelete,
  fetchUserDepttList,
  fetchUserDetail,
  fetchUserList
} from "@/api/modules/system/userManage2";
import { Layout, Form, Spin, Button, Input, Popconfirm } from "antd";
import TreeList from "./treeList";
import TableList from "./tableList";
import { message, notification } from "@/hooks/useMessage";
import AddPolice from "./addPolice";
import SelectRole from "./selectRole";
const FormItem = Form.Item;
const { Content, Sider } = Layout;

const UserManager2: React.FC = () => {
  const [formSearch] = Form.useForm();

  const [searchtitle, setsearchtitle] = useState("");
  const [PoliceAdd, setPoliceAdd] = useState({
    PoliceAddVisible: false,
    moduletype: "",
    moduletitle: ""
  });
  const [currPeopleId, setcurrPeopleId] = useState("");

  const [RoleVisible, setRoleVisible] = useState(false);

  const [spinloading, setspinloading] = useState(false);

  // 同步人员加载状态
  const [synchronizeLoading, setsynchronizeLoading] = useState(false);

  // 按钮权限的数组
  const [btnRights, setbtnRights] = useState({
    view: true,
    freeze: true,
    delete: true,
    edit: true,
    add: true
  });

  // 搜索参数
  const [searchKey, setsearchKey] = useState<any>({
    keyword: "",
    pageSize: 10,
    pageNo: 1,
    deptCode: ""
  });

  // 地区信息
  const [userDeptResult, setuserDeptResult] = useState<any>({ list: [], loading: false });
  // 用户列表数据 Table中数据
  const [userListResult, setuserListResult] = useState<any>({ list: [], loading: false });
  // 用户详情
  const [userDetailResult, setuserDetailResult] = useState<any>({ list: [], loading: false });
  // 角色类别
  const [userRoleSetResult, setuserRoleSetResult] = useState<any>({ list: [], loading: false });

  const GetUserList = (callback: Function) => {
    fetchUserList(searchKey).then((res: any) => {
      // console.log("获取用户列表数据：", res);
      setuserListResult({ list: res.data });
      callback && callback();
    });
  };

  useEffect(() => {
    roleList().then((res: any) => {
      // console.log("角色类别结果：", res);
      setuserRoleSetResult({ list: res.data.list });
    });
    fetchUserDepttList({}).then((res: any) => {
      // console.log("获取左侧地区信息：", res);
      setuserDeptResult({ list: res.data });
      setsearchKey((state: any) => {
        return {
          ...state,
          deptCode: res.data[0].deptCode
        };
      });
      setsearchtitle(res.data[0].deptName);
    });
    GetUserList(() => {});
  }, []);

  // 人员角色 （角色弹窗）
  const handleUserRole = (id: string) => {
    // fetchUserDetail({id}).then((res: any) => {
    // 	console.log("用户角色信息：", res);
    // 	setuserDetailResult({list: res.data})
    // 	setPoliceAdd({
    // 		PoliceAddVisible: true,
    // 		moduletype:"edit",
    // 		moduletitle:"详情",
    // 	})
    // 	setcurrPeopleId(id)
    // })
  };
  // 操作 - 详情
  const handleUserInfo = (id: string) => {
    fetchUserDetail({ id }).then((res: any) => {
      console.log("用户角色信息：", res);
      setuserDetailResult({ list: res.data });
      setPoliceAdd({
        PoliceAddVisible: true,
        moduletype: "edit",
        moduletitle: "详情"
      });
      setcurrPeopleId(id);
    });
  };
  const handleChangeStatus = (id: string, status: string) => {
    fetchChangeUserStatus({ id: id, status: status }).then((res: any) => {
      message.success(res.msg);
      GetUserList(() => {});
    });
  };
  const handleDelete = (id: string) => {
    if (sessionStorage.getItem("userid") === id) {
      message.warning("自己不能删除自己");
      return;
    }
    const curUserListResult = userListResult.list;
    let curpage = searchKey.pageNo;
    fetchUserDelete({ deptcode: searchKey.deptCode, id: id }).then((res: any) => {
      message.success(res.msg);
      if (curUserListResult.totalPage > 1 && curUserListResult.totalCount % 10 === 1) {
        curpage -= 1;
      }
      setsearchKey((state: any) => {
        return {
          ...state,
          pageNo: curpage
        };
      });
      GetUserList(() => {});
    });
  };
  const column = [
    {
      title: "姓名",
      dataIndex: "chineseName",
      key: "chineseName",
      width: "15%"
    },
    {
      title: "职务",
      dataIndex: "post",
      key: "post",
      width: "15%",
      // render: (text: any) => <span>老板+总经理+经理+员工+前端+后端</span>
      render: (text: any) => <span>员工</span>
    },
    {
      title: "帐号",
      dataIndex: "username",
      key: "username",
      width: "15%"
    },
    {
      title: "帐号状态",
      dataIndex: "statusLabel",
      key: "statusLabel",
      width: "15%",
      render: (text: any, record: { status: any }, index: any) => <span>{record.status ? "已冻结" : "正常"}</span>
    },
    {
      title: "角色",
      dataIndex: "roles",
      key: "roles",
      width: "20%",
      render: (text: any, record: any, index: any) => {
        // console.log("角色", text)
        const roleNames: any[] = [];
        (text || []).map((item: { roleName: any }) => {
          roleNames.push(item.roleName);
        });
        // return roleNames.length === 0 ? "" : roleNames.join(",");
        let roleN = roleNames.length === 0 ? "" : roleNames.join(",");
        return (
          <button
            onClick={() => {
              handleUserRole(record.id);
            }}
          >
            {roleN || "普通用户"}
          </button>
        );
      }
    },
    {
      title: "操作",
      key: "operate",
      render: (text: any, record: { id: any; status: any }, index: any) => {
        return (
          <span>
            {btnRights.view ? (
              <span>
                <a onClick={() => handleUserInfo(record.id)}>详情</a>
                <span className="ant-divider" />
              </span>
            ) : null}
            {btnRights.freeze ? (
              <span>
                <Popconfirm
                  title={`确认${record.status ? "解冻" : "冻结"}账户?`}
                  placement="left"
                  onConfirm={() => handleChangeStatus(record.id, `${record.status}`)}
                >
                  <a>{record.status ? "解冻账户" : "冻结账户"}</a>
                </Popconfirm>
              </span>
            ) : null}
            <span className="ant-divider" />
            {btnRights.delete ? (
              <Popconfirm title="删除用户?" placement="left" onConfirm={() => handleDelete(record.id)}>
                <a>删除</a>
              </Popconfirm>
            ) : null}
          </span>
        );
      }
    }
  ];
  // 点击树节点TreeList
  const treeListOnSelect = (info = [], title: string) => {
    setspinloading(true);
    setsearchtitle(title);
    setsearchKey((state: any) => {
      return {
        ...state,
        deptCode: info[0],
        pageNo: 1,
        keyword: ""
      };
    });
    // 等待以上异步执行完毕，调用用户列表，
    // 参考：https://blog.csdn.net/u012896310/article/details/131660318
    GetUserList(() => {
      setspinloading(false);
    });
  };

  // 输入框搜索内容
  const handleSearch = (event: any) => {
    event.preventDefault();
    const keyword = formSearch.getFieldsValue();
    setspinloading(true);
    setsearchKey((state: any) => {
      return {
        ...state,
        keyword: keyword,
        pageNo: 1
      };
    });
    GetUserList(() => {
      setspinloading(false);
    });
  };

  const pageChange = (newPage: number) => {
    setsearchKey({ pageNo: newPage });
    GetUserList(() => {});
  };
  const pageSizeChange = (e: any, pageSize: number) => {
    setsearchKey((state: any) => {
      return {
        ...state,
        pageNo: 1,
        pageSize: pageSize
      };
    });
  };
  // 点击新增人员的时候判断部门 deptid  是否存在，有则 通知 弹窗新增
  const policeAdd = () => {
    if (searchKey.deptCode) {
      notification.info({ message: `deptId是${searchKey.deptCode}` });
      setPoliceAdd({
        PoliceAddVisible: true,
        moduletype: "add",
        moduletitle: "新增"
      });
    } else {
      notification.error({
        message: "错误",
        description: "请先选择部门"
      });
    }
  };

  const synchronize = () => {
    message.info("用户数据同步中");
    setsynchronizeLoading(true);
    setTimeout(() => {
      message.success("用户数据同步完成");
      setsynchronizeLoading(false);
      GetUserList(() => {});
    }, 2500);
  };

  // Modal - 新增或编辑用户保存
  const handleOk = () => {
    const curUserListResult = userListResult.list;
    let curpage = searchKey.pageNo;
    // 当添加用户，要添加的第11或21等，要翻页时
    if (
      PoliceAdd.moduletype === "add" &&
      curUserListResult &&
      curUserListResult.totalCount > 0 &&
      curUserListResult.totalCount % 10 === 0
    ) {
      curpage += 1;
    }
    setPoliceAdd({ PoliceAddVisible: false, moduletype: "", moduletitle: "" });
    setsearchKey((state: any) => {
      return {
        ...state,
        pageNo: curpage
      };
    });
    GetUserList(() => {});
  };

  const handleOkRole = () => {};
  const handleCancelRole = () => {};
  return (
    <div className="page page-scrollfix page-usermanage">
      <Layout>
        <Layout className="page-body">
          {/* 左侧 杭州市 + 下城区 + 文一路 */}
          <Sider width={240} style={{ display: "flex", flexDirection: "column" }}>
            <Spin spinning={spinloading}>
              <h3 className="page-title">杭州市</h3>
              {/* --------封装的Tree结构----------- */}
              <div className="treeside">
                <TreeList trees={userDeptResult.list} curDeptCode={searchKey.deptCode} onSelect={treeListOnSelect} />
              </div>
            </Spin>
          </Sider>

          {/* 杭州市 + 用户信息 */}
          <Content>
            <h3 className="page-title">
              {searchtitle}
              <span className="error"> {userListResult.totalCount ? userListResult.totalCount : 0}</span>人
            </h3>
            <div className="page-header">
              <div className="layout-between">
                <Form className="flexrow" form={formSearch} onFinish={handleSearch}>
                  <FormItem>
                    <Input className="input-base-width" placeholder="请输入关键字进行搜索" />
                  </FormItem>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                </Form>
              </div>
            </div>
            <div className="page-content has-pagination table-flex table-scrollfix">
              <TableList
                style={{ maxHeight: 800 }}
                rowKey="id"
                columns={column}
                currentPage={searchKey.pageNo}
                pageSize={searchKey.pageSize}
                dataSource={userListResult.list.list}
                loading={userListResult.loading}
                totalCount={userListResult.list.totalCount}
                // scroll={{ y: true }}
                onChange={pageChange}
                onShowSizeChange={pageSizeChange}
              />
            </div>
            {/* 新增人员 / 同步人员 */}
            <div className="page-footer">
              <div className="page-footer-buttons">
                {btnRights.add ? (
                  <Button type="primary" style={{ marginRight: "10px" }} onClick={policeAdd}>
                    {" "}
                    新增人员
                  </Button>
                ) : null}
                {btnRights.add ? (
                  <Button type="primary" loading={synchronizeLoading} onClick={synchronize}>
                    {" "}
                    同步人员
                  </Button>
                ) : null}
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>

      {/* 允许新增的判断 */}
      {PoliceAdd.PoliceAddVisible ? (
        <AddPolice
          visible={PoliceAdd.PoliceAddVisible}
          type={PoliceAdd.moduletype}
          title={PoliceAdd.moduletitle}
          handleOk={handleOk}
          values={PoliceAdd.moduletype === "add" ? "" : userDetailResult.list}
          deptId={searchKey.deptCode}
          currPeopleId={currPeopleId}
          onCancel={() => {
            setPoliceAdd({ PoliceAddVisible: false, moduletype: "", moduletitle: "" });
          }} // 关闭弹窗
          roleList={userRoleSetResult.list || []}
        />
      ) : null}
      {RoleVisible ? (
        <SelectRole
          visible={RoleVisible}
          handleOkRole={handleOkRole}
          values={userDetailResult}
          currPeopleId={currPeopleId}
          select={userRoleSetResult.list}
          onCancel={handleCancelRole}
        />
      ) : null}
    </div>
  );
};

export default UserManager2;
