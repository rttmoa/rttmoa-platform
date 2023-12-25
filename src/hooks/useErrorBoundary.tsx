import React, { useState, useEffect } from "react";

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
      <div>
        <h1>
          {"<ErrorBoundary />"}, SomeThing went wrong: {error}
        </h1>
        <button
          onClick={() => {
            window.open("/");
            // window.replace("/");
            // window.history.back(-1);
            // window.location.href("/");
          }}
        >
          新界面
        </button>
      </div>
    );
  }
  return props.children; // 如果没有错误 返回页面的 children
}
export default ErrorBoundary;
