/* eslint-disable no-multiple-empty-lines */
/* eslint-disable prettier/prettier */
import React from "react";
import { useState, useEffect } from "react";

const Component = () => {
  function getStorageValue(key: any, defaultValue: any) {
    if (typeof window !== "undefined") {
      return defaultValue;
    }
  }

  const useLocalStorage = (key: any, defaultValue: any) => {
    const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

    useEffect(() => {
      // localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
  };

  const [value, setValue] = useLocalStorage("zs", 33);
  console.log(value);

  const onChange = () => {
    setValue((value: number) => value + 1);
  };

  return (
    <div>
      <button onClick={onChange}>切换按钮</button>
    </div>
  );
};

export default Component;
