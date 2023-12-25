import React, { useState } from "react";
import { useContext } from "react";
import { Button, Card, Divider, Input, Space, Typography } from "antd";
import { HOME_URL } from "@/config";
import { RootState, useDispatch, useSelector } from "@/redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RefreshContext } from "@/context/Refresh";
import { setGlobalState } from "@/redux/modules/global";
import { message } from "@/hooks/useMessage";
import { removeTab, closeMultipleTab, closeTabsOnSide, setTabTitle } from "@/redux/modules/tabs";
import {
  ReloadOutlined,
  ExpandOutlined,
  CompressOutlined,
  CloseCircleOutlined,
  ColumnWidthOutlined,
  SwitcherOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
  SmileOutlined
} from "@ant-design/icons";

const Tabs: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();

  const path = pathname + search;

  const [value, setValue] = useState("");

  const maximize = useSelector((state: RootState) => state.global.maximize);

  const { updateOutletShow } = useContext(RefreshContext);
  const refreshCurrentPage = () => {
    updateOutletShow(false);
    setTimeout(() => updateOutletShow(true));
  };

  // todo：react-routerV6 路由传递参数的三种方式
  // State 传参：注意：此时路由上不能有params 传参时的参数占位，否则无法跳转；
  const handleToDetail = (id: string, query: string = "") => {
    // iD: params传参 （使用useParams接收参数）
    navigate(`/feat/tabs/detail/${id}${query}`);
    // State 传参：
    // navigate("/feat/tabs/", { state: { name: "Eula", age: "18" } });
  };

  const stateDetail = () => {
    const obj = {
      id: 3,
      name: "san",
      age: 36
    };
    navigate("/feat/tabs/", { state: obj });
  };
  // console.log("/feat/tabs页：", useLocation());

  return (
    <React.Fragment>
      <Card className="mb10">
        <Typography.Title level={4} className="mb20">
          Tab 标题
        </Typography.Title>
        <Space.Compact style={{ width: "350px" }}>
          <Input placeholder="Please enter content" value={value} onChange={e => setValue(e.target.value)} />
          <Button
            type="primary"
            onClick={() => {
              if (!value) return message.warning("请输入 Tab 标题");
              dispatch(setTabTitle(value));
            }}
          >
            Submit
          </Button>
        </Space.Compact>
      </Card>

      <Card className="mb10">
        <Typography.Title level={4} className="mb20">
          Tab 操作
        </Typography.Title>
        <Space className="text">
          <Button type="primary" icon={<ReloadOutlined />} onClick={refreshCurrentPage}>
            刷新当前页
          </Button>
          <Button
            type="primary"
            icon={maximize ? <CompressOutlined /> : <ExpandOutlined />}
            onClick={() => dispatch(setGlobalState({ key: "maximize", value: !maximize }))}
          >
            当前页全屏切换
          </Button>
          <Button type="primary" icon={<CloseCircleOutlined />} onClick={() => dispatch(removeTab({ path, isCurrent: true }))}>
            关闭当前标签页
          </Button>
          <Button
            type="primary"
            icon={<VerticalRightOutlined />}
            onClick={() => dispatch(closeTabsOnSide({ path, type: "left" }))}
          >
            关闭左侧标签页
          </Button>
          <Button
            type="primary"
            icon={<VerticalLeftOutlined />}
            onClick={() => dispatch(closeTabsOnSide({ path, type: "right" }))}
          >
            关闭右侧标签页
          </Button>
          <Button type="primary" icon={<ColumnWidthOutlined />} onClick={() => dispatch(closeMultipleTab({ path }))}>
            关闭其它标签页
          </Button>
          <Button
            type="primary"
            icon={<SwitcherOutlined />}
            onClick={() => {
              dispatch(closeMultipleTab({}));
              navigate(HOME_URL);
            }}
          >
            关闭所有标签页
          </Button>
        </Space>
      </Card>

      <Card>
        <Typography.Title level={4} className="mb20" style={{ color: "red" }}>
          Tab 跳转 （Tabs Detail中接收参数处理）
        </Typography.Title>
        <Typography.Title level={5}>详情页："path":"/feat/tabs/detail/:id"</Typography.Title>
        <Space className="text">
          <Button type="primary" icon={<SmileOutlined />} onClick={() => handleToDetail("1")}>
            打开详情页1
          </Button>
          <Button type="primary" icon={<SmileOutlined />} onClick={() => handleToDetail("2")}>
            Params 传参（打开详情页2）
          </Button>
          <Button type="primary" icon={<SmileOutlined />} onClick={() => handleToDetail("5", "?params=详情文章&pageSize=30")}>
            Search 传参
          </Button>
          <Button type="primary" icon={<SmileOutlined />} onClick={() => stateDetail()}>
            State 传参（传递本页）
          </Button>
        </Space>
      </Card>

      <Card className="mb10">
        <Typography.Title level={4} className="mb20" style={{ color: "red" }}>
          跳转 空白页
        </Typography.Title>
        <Button type="primary" icon={<SmileOutlined />} onClick={() => navigate("/noLayout/index")}>
          No layout 空白页
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Tabs;
