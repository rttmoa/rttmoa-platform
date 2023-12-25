// /* eslint-disable no-unused-vars */

// // geek-pc-class
// import { createRef } from "react";
// import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
// import { Select, Option, message, Form, Input, Button, Checkbox, Layout, Menu, Popconfirm, Radio, Card, Row, Col } from "antd";
// import { createBrowserHistory } from "history";
// import { LogoutOutlined, HomeOutlined, DiffOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill"; // 富文本编辑器
// import defaultImage from "assets/error.png";

// // geek-pc-func
// // react函数组件和mobx管理
// import { useState, useEffect, useRef, lazy, Suspense, useContext, createContext } from "react";
// import {
//   Navigate,
//   useLocation,
//   useNavigate,
//   Outlet,
//   useSearchParams,
//   Routes,
//   unstable_HistoryRouter as HistoryRouter
// } from "react-router-dom";
// import {
//   makeAutoObservable,
//   configure,
//   action,
//   computed,
//   makeObservable,
//   observable,
//   makeAutoObservable,
//   autorun,
//   reaction,
//   runInAction
// } from "mobx";
// import { observer } from "mobx-react";
// import { observer } from "mobx-react-lite";
// import {
//   message,
//   Layout,
//   Menu,
//   Card,
//   Breadcrumb,
//   Form,
//   Button,
//   Radio,
//   DatePicker,
//   Select,
//   Table,
//   Tag,
//   Space,
//   Popconfirm,
//   Upload,
//   Input,
//   Checkbox
// } from "antd";
// import "moment/locale/zh-cn";
// import locale from "antd/es/date-picker/locale/zh_CN";
// import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
// import logo from "@/assets/logo.png";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { setToken, getToken, clearToken, http, history, isAuth } from "@/utils";
// import { createBrowserHistory } from "history";
// import axios from "axios";
// import "antd/dist/antd.min.css";
// const { Option } = Select;
// const { Header, Sider } = Layout;
// const { RangePicker } = DatePicker;

// // geek-h5-js
// import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
// import { useHistory, useLocation, Redirect, Route, Router, Switch, Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import classnames from "classnames";
// import dayjs from "dayjs"; // 模块标准时间 转换为 多长时间之前 比如2022-03-11 09:00:00 - 四年前
// import relativeTime from "dayjs/plugin/relativeTime";
// import "dayjs/locale/zh-cn";
// dayjs.locale("zh-cn");
// dayjs.extend(relativeTime);
// import PropTypes from "prop-types";
// import throttle from "lodash/fp/throttle";
// import {
//   deleteCollection,
//   deleteCommentLiking,
//   deleteFollow,
//   deleteLiking,
//   getArticleInfo,
//   getCommentList,
//   getMoreComment,
//   setComment,
//   setInfo,
//   updateCollection,
//   updateCommentLiking,
//   updateFollow,
//   updateLiking,
//   addChannel,
//   deleteChannel,
//   getRecommendChannel,
//   setMoreAction,
//   getUser,
//   getUserChannel,
//   getUserProfile,
//   logout,
//   updateAvatar,
//   updateProfile
// } from "@/store/actions";
// import DOMPurify from "dompurify";
// import hljs from "highlight.js";
// import "highlight.js/styles/vs2015.css";
// import { memo, useCallback, useEffect, useRef, useState } from "react";
// import ContentLoader from "react-content-loader"; //Loader 生成列表加载占位组件、低俗3g看效果
// import { areEqual, VariableSizeList as List } from "react-window";
// import InfiniteLoader from "react-window-infinite-loader";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import io from "socket.io-client";
// import { PullToRefresh, ImagePicker, InputItem, DatePicker, Drawer, List, Modal, Toast } from "antd-mobile";
// import debounce from "lodash/debounce";
// import differenceBy from "lodash/differenceBy";
// import { combineReducers } from "redux";
// import { applyMiddleware, createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";
// import { Provider } from "react-redux";
// const Item = List.Item;
// const alert = Modal.alert;

// function App() {
//   return <div className="App">技术栈</div>;
// }
// export default App;
