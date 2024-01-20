import React, { useEffect, useState } from "react";
import { Button, Card, Popconfirm, Table, TableColumnsType, message, Image } from "antd";
import { useNavigate } from "react-router-dom";
import defaultImg from "@/assets/images/defaultImg.jpg";

export interface listProps {
  list: any;
  total: number;
  page: number;
}
export const listApi: Promise<listProps> = new Promise(reslove =>
  reslove({
    total: 3,
    page: 2,
    list: [
      {
        onSale: true,
        // content: "<p>是公司的公司的根深蒂固</p>",
        content: "是公司的公司的根深蒂固",
        quantity: 10,
        price: 16,
        _id: "642ee36ff3d52f4db845ff43",
        name: "黄鹤楼",
        coverImg: "",
        // coverImg: "http://localhost:3009/uploads/20230406/1680794476636.jpg",
        createdAt: "2023-04-06T15:21:19.394Z",
        updatedAt: "2023-09-25T14:43:41.745Z",
        __v: 0
      },
      {
        onSale: false,
        content: "东方式的防守对方身份的",
        quantity: 10,
        price: 17,
        _id: "642ee364f3d52f4db845ff42",
        name: "利群",
        coverImg: "",
        // coverImg: "http://localhost:3009/uploads/20230406/1680794465206.jpg",
        createdAt: "2023-04-06T15:21:08.502Z",
        updatedAt: "2023-05-02T07:43:32.215Z",
        __v: 0
      },
      {
        onSale: true,
        content: "所得税的方式",
        quantity: 10,
        price: 23,
        _id: "642ee364f3d52f4db845341242",
        name: "玉溪",
        coverImg: "",
        // coverImg: "http://localhost:3009/uploads/20230406/1680794465206.jpg",
        createdAt: "2023-04-06T15:21:08.502Z",
        updatedAt: "2023-05-02T07:43:32.215Z",
        __v: 0
      }
    ]
  })
);
export const serverUrl = "http://localhost:3009";

const List = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<listProps>({ list: [], total: 0, page: 0 });
  const { list, total, page } = data;
  // console.log(data);

  // 发送请求 | 通过redux去处理
  const loadData = () => {
    listApi.then((res: listProps): void => {
      // console.log(res);
      setData(res);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns: TableColumnsType = [
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
      render: (txt: any, record: any) => (
        // record.coverImg ? <img src={record.coverImg} alt={record.name} style={{ width: 120 }} /> : "暂无图片"
        <Image src={record.coverImg ? serverUrl + record.coverImg : defaultImg} alt={record.name} style={{ width: 60 }} />
      )
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
                navigate(`/list/curd/product/detail?id=${record._id}`);
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
                message.info(`删除： _id=${record._id}`);
              }}
            >
              <Button type="dashed" size="small" style={{ margin: "0 1rem" }}>
                删除
              </Button>
            </Popconfirm>
            <Button
              size="small"
              onClick={() => {
                // modifyOne(record._id, { onSale: !record.onSale }).then(res => {
                //   loadData();
                // });
                message.info(`修改在售： _id=${record._id}`);
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
              navigate("/list/curd/product/detail");
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
