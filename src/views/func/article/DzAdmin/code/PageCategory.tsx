import React from 'react';

const PageCategory =
`import React, { Component } from "react";
import { Card, Button, Table, Space, Modal, message } from "antd";
import "./index.less";
import { SaveOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { list, add, update } from "../../api/category";
import AddFrom from "../../components/Category/add-from";
import UpdateFrom from "../../components/Category/update-from";
const { Column } = Table;

/***--- 商品 --> 品类管理 ---**/
class Category extends Component {
  state = {
    categoryList: [],
    // 用户存在select下拉框的数据
    selectCategoryList: [],
    parentId: 0,
    parentName: "",
    loading: false,
    addIsModalVisible: false,
    updateIsModalVisible: false,
    // 存取添加和修改的数据
    data: {},
  };

  // 页面挂载时的钩子函数
  componentDidMount() {
    this.init();
  }

  // 收集form数据
  getFromDate = (obj) => {
    // console.log("收集form数据", obj) // 修改分类 如果输入数据 在子组件中传递到此 会一直触发回调函数
    this.setState({ data: obj });
  };

  /**
   * 初始化
   */
  init = () => {
    this.setState({ loading: true });
    list(this.state.parentId).then((res) => {
      this.setState({ categoryList: res.data, loading: false });
      // select框只存取parentId=0的数据所以这里做了一个判断
      if (this.state.parentId === 0) {
        this.setState({ selectCategoryList: res.data });
      }
    });
  };
  // 查看子分类回调
  handFindChild = (category) => {
    return () => {
      this.setState(
        { parentId: category._id, parentName: category.name },
        () => {
          this.init();
        }
      );
    };
  };
  // 返回回调
  back = () => {
    this.setState({ parentId: 0 }, () => {
      // 设置parentId为0，等回调函数成功后 重新获取数据
      this.init();
    });
  };
  showAdd = () => {
    this.setState({ addIsModalVisible: true });
  };
  showUpdate = (category) => {
    this.category = category;
    // 赋值初始化数据
    this.setState({
      updateIsModalVisible: true,
      data: { categoryId: category._id, categoryName: category.name },
    });
  };
  // 添加回调
  add = (data) => {
    add(data).then((res) => {
      if (res.status === 0) {
        this.handleCancel();
        this.init();
      }
    });
  };
  // 修改回调
  update = () => {
    if (this.state.data.categoryName === "") {
      message.error("分类名称不能为空");
      return;
    }
    update(this.state.data).then((res) => {
      if (res.status === 0) {
        this.handleCancel();
        this.init();
      }
    });
  };
  // model取消事件
  handleCancel = () => {
    this.setState({ addIsModalVisible: false, updateIsModalVisible: false });
  };

  render() {
    const {
      categoryList,
      selectCategoryList,
      parentId,
      loading,
      parentName,
      addIsModalVisible,
      updateIsModalVisible,
    } = this.state;
    const category = this.category || {};
    return (
      <div>
        <Card
          title={
            parentId === 0 ? (
              "一级分类列表"
            ) : (
              <span>
                一级分类列表
                <ArrowRightOutlined style={{ marginLeft: 10 }} />
                <Button onClick={this.back} type="link">
                  {parentName}
                </Button>
              </span>
            )
          }
          extra={
            <Button
              icon={<SaveOutlined />}
              type="primary"
              onClick={this.showAdd}
            >
              添加分类
            </Button>
          }
          style={{ width: "100%", height: "100%" }}
        >
          <Table
            bordered
            pagination={{
              pageSize: 5,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 15, 20],
            }}
            loading={loading}
            dataSource={categoryList}
            rowKey="_id"
          >
            <Column title="分类名称" dataIndex="name" key="_id" />
            <Column
              width="300px"
              title="操作"
              align={"center"}
              key="action"
              render={(category, record) => (
                <Space size="middle">
                  <Button onClick={() => this.showUpdate(category)} type="link">
                    修改分类
                  </Button>
                  {parentId === 0 ? (
                    <Button type="link" onClick={this.handFindChild(category)}>
                      查看子分类
                    </Button>
                  ) : null}
                </Space>
              )}
            />
          </Table>
        </Card>
        {/*footer={null}   Modal底部不会显示*/}
        {/* 添加分类 */}
        <Modal
          footer={null}
          destroyOnClose
          title="添加分类"
          visible={addIsModalVisible}
          onCancel={this.handleCancel}
        >
          <AddFrom
            parentId={parentId}
            selectCategoryList={selectCategoryList}
            add={this.add}
            handleCancel={this.handleCancel}
          />
        </Modal>
        {/* 修改分类 */}
        <Modal
          destroyOnClose
          title="修改分类"
          visible={updateIsModalVisible}
          onOk={this.update}
          onCancel={this.handleCancel}
        >
          <UpdateFrom getFromDate={this.getFromDate} category={category} />
        </Modal>
      </div>
    );
  }
}

export default Category;`

export default PageCategory;
