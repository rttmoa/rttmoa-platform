import { Card, Descriptions } from "antd";
import React, { useState } from "react";
import type { DescriptionsProps } from "antd";

interface UserType {
  name: string;
  age: number;
  address: string;
}

const UserDemo: React.FC<{ user: UserType }> = ({ user }): any => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "name",
      children: user["name"]
    },
    {
      key: "2",
      label: "age",
      children: user["age"]
    },
    {
      key: "3",
      label: "address",
      children: user["address"]
    }
  ];
  return (
    <>
      <Descriptions title="userInfo" items={items} />
    </>
  );
};

const UserList = () => {
  return (
    <>
      <h3>TS 支持</h3>
      <UserDemo user={{ name: "Dail", age: 16, address: "Shanghai" }} />
    </>
  );
};

export default UserList;
