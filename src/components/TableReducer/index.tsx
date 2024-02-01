import React, { useEffect, useReducer, useCallback } from "react";
import { Table } from "antd";

import { ArgTableProps, paginationInitialType, initialStateType, actionType } from "./interface";

export default function TableReducer(props: ArgTableProps) {
  const { owncolumns, queryAction, params, baseProps } = props;
  // 分页数据
  const paginationInitial: paginationInitialType = {
    current: 1,
    pageSize: 10,
    total: 0
  };
  // table组件全量数据
  const initialState: initialStateType = {
    loading: false,
    pagination: paginationInitial,
    dataSource: []
  };
  const reducer = (state: initialStateType, action: actionType) => {
    const { payload } = action;
    switch (action.type) {
      case "TOGGLE_LOADING":
        return { ...state, loading: !state.loading };
      case "SET_PAGINATION":
        return { ...state, pagination: payload.pagination };
      case "SET_DATA_SOURCE":
        return { ...state, dataSource: payload.dataSource };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // 改变页码
  function handleTableChange(payload: any) {
    if (payload) {
      const { current } = payload;
      dispatch({
        type: "SET_PAGINATION",
        payload: {
          pagination: {
            ...state.pagination,
            current
          }
        }
      });
    }
  }
  // useCallback包装请求，缓存依赖，优化组件性能
  const fetchDataWarp = useCallback(fetchData, [params, state.pagination.current, owncolumns, queryAction]);
  async function fetchData() {
    dispatch({
      type: "TOGGLE_LOADING"
    });
    // 分页字段名称转换
    const { current: indexfrom, pageSize: counts } = state.pagination;
    let res = await queryAction({ indexfrom, counts, ...params }).catch((err: any) => {
      dispatch({ type: "TOGGLE_LOADING" });
      return {};
    });
    // 关闭loading
    dispatch({
      type: "TOGGLE_LOADING"
    });
    if (res.result === 200) {
      const { totalcounts, list } = res;
      dispatch({
        type: "SET_PAGINATION",
        payload: {
          pagination: { ...state.pagination, total: totalcounts }
        }
      });
      // 回填list数据
      dispatch({
        type: "SET_DATA_SOURCE",
        payload: {
          dataSource: list
        }
      });
    }
  }
  useEffect(() => {
    fetchDataWarp();
  }, [fetchDataWarp]);
  return (
    <Table
      columns={owncolumns(fetchData)}
      pagination={state.pagination}
      dataSource={state.dataSource}
      loading={state.loading}
      onChange={handleTableChange}
      {...baseProps}
    />
  );
}
