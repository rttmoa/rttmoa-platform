import { useCallback, useEffect, useRef, useState } from "react";
import { useSet } from "ahooks";

// 1. Fetch on mount
// 2. Fetch on the button click
// 3. Fetch on params change
const useAsyncFetch = (asyncFunction: any, args = [], deps = [], immediate = true) => {
  const isFirstUpdate = useRef(true);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setLoading(true);
    setResponse(null);
    setError(null);
    return asyncFunction(...args)
      .then((res: any) => {
        setResponse(res);
      })
      .catch((err: any) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [asyncFunction, args]);

  useEffect(() => {
    if (immediate || !isFirstUpdate.current) {
      execute();
    }
  }, [immediate, execute, ...deps]);

  useEffect(() => {
    isFirstUpdate.current = false;
  }, []);
  return { execute, loading, response, error };
};
export default useAsyncFetch;
