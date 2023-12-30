import { useEffect, useReducer } from "react";

type Action = {
  type?: string;
  data?: any;
  error?: string;
};

const initialState = {
  loading: false,
  data: null,
  error: null
};

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "loading":
      return { ...initialState, loading: true };
    case "success":
      return { ...initialState, data: action.data };
    case "error":
      return { ...initialState, error: action.error };
    default:
      throw new Error();
  }
};

const useApiCallOnMount = (service: Promise<any>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "loading" });
    service
      .then((data: any) => {
        dispatch({ type: "success", data });
      })
      .catch((error: any) => {
        dispatch({ type: "error", error });
      });
  }, [service]);

  return [state?.loading, state?.data, state?.error];
};

export default useApiCallOnMount;

// const [loading, data, error] = useApiCallOnMount()
