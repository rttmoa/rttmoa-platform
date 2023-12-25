import React from 'react';

const PageUser = 
`import React, { Component } from "react";
import { Button, Card, Space, Table, Modal, message } from "antd";
import { list, del } from "../../api/user";
import { formatDate } from "../../utils/timeConversionUtil";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import AddUpdate from "../../components/User/add-update";

const { Column } = Table;
const { confirm } = Modal;

/***--- 用户管理 ---**/
class User extends Component {
  state = {
    loading: false,
    userList: [],
    roleList: [],
    isModalVisible: false,
    titleName: "",
    user: {}, // 需要修改的数据
  };

  componentDidMount() {
    this.init();
  }
  init = () => {
    list().then((res) => {
      // console.log(res)
      const users = res.data.users.map((user) => {
        res.data.roles.forEach((role) => {
          if (role._id === user.role_id) {
            user.roleName = role.name;
          }
        });
        return user;
        // res.data.roles.map(role => {if (role._id === user.role_id) {user.roleName = role.name} return}) return user;
      });

      this.setState({ userList: users, roleList: res.data.roles });
    });
  };
  //删除事件
  del = (id) => {
    return () => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "确定要删除？",
        onOk: () => {
          del({ userId: id }).then((res) => {
            if (res.status === 0) {
              message.success("删除成功");
              this.init();
            }
          });
        },
      });
    };
  };

  //取消事件
  handleCancel = () => {
    this.setState({ isModalVisible: false, user: {} });
  };

  render() {
    const title = (
      <span>
        <Button
          type="primary"
          onClick={() =>
            this.setState({ isModalVisible: true, titleName: "添加用户" })
          }
        >
          创建用户
        </Button>
      </span>
    );
    const { loading, userList, isModalVisible, titleName, roleList, user } =
      this.state;
    // console.log(userList)
    // console.log(roleList)
    return (
      <div>
        <Card title={title} style={{ width: "100%", height: "100%" }}>
          <Table
            bordered
            pagination={{
              defaultPageSize: 3,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 15, 20, 100],
            }}
            loading={loading}
            dataSource={userList}
            rowKey="_id"
          >
            <Column
              align={"center"}
              title="用户名"
              dataIndex="username"
              key="username"
            />
            <Column
              align={"center"}
              title="邮箱"
              dataIndex="email"
              key="email"
            />
            <Column
              align={"center"}
              title="电话"
              dataIndex="phone"
              key="phone"
            />
            <Column
              align={"center"}
              title="注册时间"
              dataIndex="create_time"
              key="create_time"
              render={(create_time, user) =>
                formatDate(create_time)
              } /* create_time: 1555061512734 */
            />
            <Column
              align={"center"}
              title="所属角色"
              dataIndex="roleName"
              key="roleName"
            />
            <Column
              align={"center"}
              width="100px"
              title="操作"
              key="action"
              render={(user, record) => (
                <Space size="middle">
                  <Button
                    type="link"
                    onClick={() =>
                      this.setState({
                        isModalVisible: true,
                        titleName: "修改用户",
                        user,
                      })
                    }
                  >
                    修改
                  </Button>
                  <Button onClick={this.del(user._id)} type="link">
                    删除
                  </Button>
                </Space>
              )}
            />
          </Table>
        </Card>

        <Modal
          destroyOnClose
          title={titleName}
          footer={null}
          visible={isModalVisible}
          onCancel={this.handleCancel}
        >
          <AddUpdate
            user={user}
            init={this.init}
            title={titleName}
            handleCancel={this.handleCancel}
            roleList={roleList}
          />
        </Modal>
      </div>
    );
  }
}

export default User;
`

export default PageUser;