import React from "react";

type actionType = {
  type: string;
  data: any;
  error: string;
};
// ? useFetchReducer
// https://codesandbox.io/s/elastic-framework-9wqd9?file=/src/App.js:140-188
export default function useFetchReducer(initData = null) {
  const initialState = {
    status: "idle",
    data: initData,
    error: null
  };
  const fetchReducer = (currentState: any, action: actionType) => {
    switch (action.type) {
      case "FETCH":
        return {
          ...currentState,
          status: "loading"
        };
      case "RESOLVE":
        return {
          status: "success",
          data: action.data,
          error: null
        };
      case "REJECT":
        return {
          data: null,
          status: "failure",
          error: action.error
        };
      default:
        return currentState;
    }
  };
  return React.useReducer(fetchReducer, initialState);
}
