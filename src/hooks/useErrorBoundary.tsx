import React, { useState, useEffect } from "react";
import CachePng from "@/assets/images/cache.png";
import { Button, Space } from "antd";

// ? 错误边界
function ErrorBoundary(props: any) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleErrors = (err: any) => {
      setError(err.error.message);
    };
    window.addEventListener("error", handleErrors);
    return () => {
      window.addEventListener("error", handleErrors);
    };
  }, []);
  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginTop: 130 }}>
          <img src={CachePng} alt="ErrorBoundary" style={{ width: 500 }} />
        </div>
        <br />
        <h3>
          {"<ErrorBoundary />"}, SomeThing went wrong： {error}
        </h3>
        <div>
          <Space>
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
