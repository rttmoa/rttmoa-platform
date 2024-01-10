import { Card } from "antd";
import React from "react";

interface UserType {
  name: string;
  age: number;
  address: string;
}

const UserDemo: React.FC<{ user: UserType }> = ({ user }): any => {
  return (
    <>
      <div>
        
      </div>
    </>
  );
};

const UserList = () => {
  return (
    <>
      <h3>TS 支持</h3>
      <UserDemo user={{ name: "V", age: 16, address: "Shanghai" }} />
    </>
  );
};

export default UserList;
