export const waitTime = (time = 100) => {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove(true);
    }, time);
  });
};

export const suffix = (object = {}) => {
  const timestamp = Math.round(new Date().getTime());
  return {
    ...object,
    timestamp
  };
};

export const flattenRoutes: any = (arr = []) =>
  arr.reduce((prev: any[], item: { children: any }) => {
    if (Array.isArray(item.children)) {
      prev.push(item);
    }
    return prev.concat(Array.isArray(item.children) ? flattenRoutes(item.children) : item);
  }, []);

export const getLocalStorage = (key: string) => {
  const value = window.localStorage.getItem(key) as any;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
export const setLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
export const removeLocalStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
export const clearLocalStorage = () => {
  window.localStorage.clear();
};
