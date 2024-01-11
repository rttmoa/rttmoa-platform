/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import CachePng from "@/assets/images/cache.png";
import { Button, List, Space, Typography } from "antd";

// ? 错误边界
function ErrorBoundary(props: any) {
  const [error, setError] = useState(false);
  const [errData, setErrData] = useState<any>([]); 

  useEffect(() => {
    const handleErrors = (err: any) => { 
      if (err?.filename) {
        setErrData((prev: any) => {
          return [...prev, { ErrFile: err?.filename }];
        });
      }
      if (err?.message) {
        setErrData((prev: any) => {
          return [...prev, { ErrMessage: err?.message }];
        });
      }
      setError(true);
    };
    window.addEventListener("error", handleErrors);
    return () => {
      window.addEventListener("error", handleErrors);
    };
  }, []);
  // console.log("errData", errData);

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="mb30" style={{ marginTop: 130 }}>
          <img src={CachePng} alt="ErrorBoundary" style={{ width: 500 }} />
        </div>
        <br />
        <h3 className="mb30">
          <List
            header={<div>{"<ErrorBoundary />"}, SomeThing went wrong</div>}
            bordered
            dataSource={errData}
            renderItem={(item: any, idx) => { 
              return (
                <List.Item>
                  <b>{Object.keys(item)}：</b>{"    "}
                  <Typography.Text>{Object.values(item)}</Typography.Text>
                </List.Item>
              );
            }}
          />
        </h3> 
        <div>
          <Space>
            <Button onClick={() => { window.location.reload(); }}>重新加载</Button>
            <Button
              onClick={() => {
                window.open("/");
                // window.replace("/");
                // window.history.back(-1);
                // window.location.href("/");
              }}
            >
              跳转新界面
            </Button>
          </Space>
        </div>
      </div>
    );
  }
  return props.children; // 如果没有错误 返回页面的 children
}
export default ErrorBoundary;
