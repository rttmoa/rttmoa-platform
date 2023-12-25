/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { Card, Typography } from "antd";
import { useDispatch } from "@/redux";
import { setTabTitle } from "@/redux/modules/tabs";
import { useLocation, useParams,useSearchParams } from "react-router-dom";

const { Title } = Typography;

const TabsDetail: React.FC = () => {
  const { id } = useParams(); // 获取匹配的 iD：`/feat/tabs/detail/:id`
  console.log('useLocation()', useLocation()); // 查看参数
  // todo 一、获取Search传参 
  // const { search } = useLocation();
  // const query = new URLSearchParams(search).get("params");
  // todo 二、获取Search传参 
  // let [searchParams, setSearchParams] = useSearchParams()
  // console.log("useSearchParams", searchParams.get("params"));
  // console.log("useSearchParams", searchParams.get("pageSize"));



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTabTitle(`No.${id} - Tab 详情`));
  }, []);

  return (
    <Card>
      <Title level={4}> 我是 Tab 详情页</Title>
      <Title level={5}>params ：{id}</Title>
      {/* {query && <Title level={5}>query ：{query}</Title>} */}
    </Card>
  );
};

export default TabsDetail;
