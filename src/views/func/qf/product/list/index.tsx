import React, { useEffect, useState } from "react";
import { Button, Card, Popconfirm, Table, TableColumnsType, message } from "antd";
import { useNavigate } from "react-router-dom";
import { listApi } from "@/api/modules/qf";
import Com from "./components";

const List = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<{ list: []; total: number; page: number }>({ list: [], total: 0, page: 0 });
  const { list, total, page } = data;
  // console.log(data);

  useEffect(() => {
    // 发送请求
    listApi().then((result: any) => {
      // console.log(result);
      setData({ ...result.data });
    });
  }, []);

  const loadData = () => {
    // 删除 修改状态 重新发请求
  };

  const columns: any = [
    {
      title: "序号",
      key: "_id",
      width: 80,
      align: "center",
      render: (text: any, record: any, index: number): any => index + 1
    },
    {
      title: "名字",
      dataIndex: "name"
    },
    {
      title: "主图",
      dataIndex: "coverImg",
      render: (txt: any, record: any) =>
        record.coverImg ? <img src={record.coverImg} alt={record.name} style={{ width: 120 }} /> : "暂无图片"
    },
    {
      title: "价格",
      dataIndex: "price"
    },
    {
      title: "是否在售",
      dataIndex: "onSale",
      render: (txt: any, record: any) => (record.onSale ? "在售" : "已下架")
    },
    {
      title: "操作",
      render: (txt: any, record: any, index: any) => {
        return (
          <div>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                navigate(`/func/qf/product/list/detail?id=${record._id}`);
              }}
            >
              修改
            </Button>
            <Popconfirm
              title="确定删除此项"
              onCancel={() => {
                console.log("用户取消删除");
              }}
              onConfirm={() => {
                // todo 此处调用api接口进行删除
                // delOne(record._id).then(res => {
                //   loadData();
                // });
                message.info(`调用删除 api; _id=${record._id}`);
              }}
            >
              <Button type="dashed" size="small" style={{ margin: "0 1rem" }}>
                删除
              </Button>
            </Popconfirm>
            <Button
              size="small"
              onClick={() => {
                // todo 在此修改状态
                // modifyOne(record._id, { onSale: !record.onSale }).then(res => {
                //   loadData();
                // });
                message.info(`调用修改 api; _id=${record._id}`);
              }}
            >
              {record.onSale ? "下架" : "上架"}
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <Card
        title="商品列表"
        extra={
          <Button
            type="primary"
            size="small"
            onClick={() => {
              navigate("/func/qf/product/list/detail");
            }}
          >
            新增
          </Button>
        }
      >
        <Table
          rowKey="_id"
          bordered
          rowClassName={(record: any) => (record?.onSale ? "" : "bg-red")}
          columns={columns}
          dataSource={list}
          pagination={{ total, defaultPageSize: 5, onChange: change => {} }}
        />
      </Card>
    </div>
  );
};

export default List;
