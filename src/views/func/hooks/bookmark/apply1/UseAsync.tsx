import React, { useState } from "react";

export function UseAsync(fetch: Function) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const execute = async () => {
    setLoading(true);
    try {
      const res = await fetch();
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  return { execute, data, loading, error };
}

function Index() {
  /** #### 假数据：https://reqres.in/  */
  const {
    execute: fetchUser,
    data: users,
    loading,
    error
  } = UseAsync(async () => {
    const res = await fetch("https://reqres.in/api/users/");
    const json = await res.json();
    return json;
  });
  return (
    <div className="user-list">
      <button onClick={fetchUser} disabled={loading}>
        {loading ? "Loading..." : "show Users"}
      </button>
      {error && <div style={{ color: "red" }}>Failed: {String(error)}</div>}
      <br />
      <ul>{users && users.length > 0 && users.map(user => <li key={user["id"]}>{user["first_name"]}</li>)}</ul> <li></li>
    </div>
  );
}
export default Index;
