import { useCallback, useEffect, useState } from "react";

function useLocalStorage(key: string, defaultValue: any) {
  return useStorage(key, defaultValue, window.localStorage);
}

function useSessionStorage(key: string, defaultValue: any) {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(key: unknown, defaultValue: () => any, storageObject: any) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject?.getItem(key);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  // useEffect 监听 key 或者 value 是否变化做出一系列操作，
  // 通过 JSON.stringify 格式化成字符串，并通过 value 是否是 undefined 进行删除操作
  useEffect(() => {
    if (value === undefined) return storageObject?.removeItem(key);
    storageObject?.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);
  return [value, setValue, remove];
}

export default function StorageComponent() {
  const [age, setAge, removeAge] = useLocalStorage("age", 26);
  const [age2] = useSessionStorage("age", 26);

  return (
    <div>
      <div>
        {age} - {age2}
      </div>
      <button onClick={() => setAge(40)}>Set Age</button>
      <button onClick={removeAge}>Remove Age</button>
    </div>
  );
}
