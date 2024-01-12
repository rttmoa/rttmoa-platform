import React from "react";
import { Button, Card, Upload } from "antd";
import useAsyncFetch from "@/apiFetch/useAsyncFetch";
import FileUpload from "./components/fileUpload";
import UserList from "./components/userList";
import Utils from "./components/utils";

const Demo: React.FC = () => {
  // const [execute, loading, response, error] = useAsyncFetch(() => {
  //   fetch("https://my-json-server.typicode.com/typicode/demo/posts");
  // });

  return (
    <>
      <Card className="mb20">
        <FileUpload />
      </Card>
      <Card className="mb20">
        <UserList />
      </Card>
      <Card>
        <Utils />
      </Card>
    </>
  );
};
export default Demo;
