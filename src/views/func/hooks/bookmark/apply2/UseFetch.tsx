import { useAsync } from "./UseAsync";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" }
};
// 根据我们封装的 useAsync，通过进一步处理，
// 我们还能够得到更好用的 useFetch，之后在项目中再使用就不需要用自己封装的 fetch.js 了，
// 毕竟其中没有 loading 或者 value 绑定在 state 的操作，可以用更好用的 useFetch
function useFetch(url: string, options = {}, dependencies = []) {
  return useAsync(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res: any) => {
      if (res.status === 200) return res.data;
      return Promise.reject(res);
    });
  }, dependencies);
}

export default function UseFetchCom() {
  let url = "";
  const { loading, error, value } = useFetch(url, { method: "post" });

  return <div>123</div>;
}
