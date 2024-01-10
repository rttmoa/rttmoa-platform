import useAsyncFetch from "@/apiFetch/useAsyncFetch";
import { Button, Card, Upload } from "antd";
import React from "react";
import FileUpload from "./components/fileUpload";
import UserList from "./components/userList";

const Demo = () => {
  // const [execute, loading, response, error] = useAsyncFetch(() => {
  //   fetch("https://my-json-server.typicode.com/typicode/demo/posts");
  // });

  return (
    <>
      <Card className="mb20">
        <FileUpload />
      </Card>
      <Card>
        <UserList />
      </Card>
    </>
  );
};
export default Demo;
