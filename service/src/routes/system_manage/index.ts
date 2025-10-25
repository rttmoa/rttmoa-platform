import User from './user';
import Menu from './menu';
import Job from './job';
import Role from './role';
import Dept from './dept';
import restApi from './restApi';
import Login from './login';
import sys from './sys';

// 系统管理模块路由聚合器
export default {
  user: User,
  menu: Menu,
  job: Job,
  role: Role,
  dept: Dept,
  restApi,
  login: Login,
  sys
};