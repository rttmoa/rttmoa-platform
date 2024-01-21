/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import CachePng from "@/assets/images/cache.png";
import { Alert, Button, List, Space, Tag, Typography } from "antd";

// ? 错误边界
function ErrorBoundary(props: any) {
  const [error, setError] = useState(false);
  const [errInfo, setErrInfo] = useState<any>({});

  useEffect(() => {
    const handleErrors = (err: any) => {
      if (err?.filename) {
        setErrInfo((prev: any) => ({ ...prev, file: err.filename }));
      }
      if (err?.message) {
        setErrInfo((prev: any) => ({ ...prev, message: err.message }));
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
    const desc = (
      <div>
        <div>
          <Tag>错误文件</Tag>
          {errInfo.file}
        </div>
        <br />
        <div>
          <Tag>错误消息</Tag>
          {errInfo.message}
        </div>
      </div>
    );
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="mb30" style={{ marginTop: 130 }}>
          <img src={CachePng} alt="ErrorBoundary" style={{ width: 500 }} />
        </div>
        <br />
        <Alert type="error" showIcon message="SomeThing went wrong" description={desc} />
        <br />
        <div>
          <Space size="large">
            <Button
              onClick={() => {
                window.location.reload();
              }}
            >
              重新加载
            </Button>
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
