import React from "react";
import { Card, Badge, Button, Space, Tag } from "antd";
interface stateConfig {
  [propName: number]: React.ReactNode;
}
interface InterestConfig {
  [propName: number]: string;
}

const UserManage = () => {
  const structure = (
    <div>
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
      >
        表格 （封装 ETable）
      </Card>
    </div>
  );

  const columnConfig = [
    {
      title: "id",
      dataIndex: "id"
    },
    {
      title: "用户名",
      dataIndex: "username"
    },
    {
      title: "性别",
      dataIndex: "sex",
      render: (sex: number) => (sex === 1 ? "男" : "女")
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
    },
    {
      title: "婚姻状态",
      dataIndex: "isMarried",
      render(isMarried: number) {
        return isMarried ? <Badge status="success" text="已婚" /> : <Badge status="error" text="未婚" />;
      }
    },
    {
      title: "生日",
      dataIndex: "birthday"
    },
    // {
    // 	title: "手机号",
    // 	render() {
    // 		return <span>{}</span>
    // 	}

    // },
    {
      title: "联系地址",
      dataIndex: "address"
    },
    {
      title: "早起时间",
      dataIndex: "time"
    },
    {
      title: "操作",
      fixed: "right",
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
  const handleOperator = (type: string, item: any) => {
    console.log("handleOperator", type, item);
  };

  return <>{structure}</>;
};

export default UserManage;
