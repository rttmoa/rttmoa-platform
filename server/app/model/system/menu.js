/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 首页
  // {
  //   "path": "/home/index",
  //   "element": "/home/index",
  //   "meta": {
  //       "key": "home",
  //       "icon": "HomeOutlined",
  //       "title": "首页",
  //       "isLink": "",
  //       "isHide": false,
  //       "isFull": false,
  //       "isAffix": true
  //   }
  // }
  // 权限管理
  // {
  //   "path": "/auth",
  //   "redirect": "/auth/page",
  //   "meta": {
  //       "key": "auth",
  //       "icon": "LockOutlined",
  //       "title": "权限管理",
  //       "isLink": "",
  //       "isHide": false,
  //       "isFull": false,
  //       "isAffix": false
  //   },
  //   "children": [
  //       {
  //           "path": "/auth/page",
  //           "element": "/auth/page/index",
  //           "meta": {
  //               "key": "pageMenu",
  //               "icon": "AppstoreOutlined",
  //               "title": "页面权限",
  //               "isLink": "",
  //               "isHide": false,
  //               "isFull": false,
  //               "isAffix": false
  //           }
  //       },
  //       {
  //           "path": "/auth/button",
  //           "element": "/auth/button/index",
  //           "meta": {
  //               "key": "authButton",
  //               "icon": "AppstoreOutlined",
  //               "title": "按钮权限",
  //               "isLink": "",
  //               "isHide": false,
  //               "isFull": false,
  //               "isAffix": false
  //           }
  //       }
  //   ]
  // }
  const MenuSchema = new Schema(
    {
      parentId: {
        type: Number,
      },
      nodeId: {
        type: Number,
      },
      path: {
        type: String,
        required: false,
      },
      element: {
        type: String,
        require: false,
        default: null,
      },
      redirect: {
        type: String,
        require: false,
        default: null,
      },
      meta: {
        type: Object,
        require: false,
        default: {},
      },
      // createTime: {
      //   type: Date,
      //   default: Date.now(),
      // },
      // updateTime: {
      //   type: Date,
      //   default: Date.now(),
      // },
    },
    {
      collection: 'menu',
      versionKey: false,
    }
  );
  const MenuModel = mongoose.model('Menu', MenuSchema);

  // MenuModel.findOne({ path: '/home/index' }).then(res => { console.log(res); });

  // 第一步：根据参数parentId 查询 nodeId
  // 10 <= x < 100
  // MenuModel.find({ nodeId: { $gte: 10, $lt: 100 } }).sort({ nodeId: -1 }).then(res => {
  //   console.log(res);
  //   const nodeID = res[0].nodeId + 1;
  //   console.log(nodeID);
  //   // 第二步：查询 path 是否重复

  //   // 第三步：创建 path
  //   // 创建首页
  //   MenuModel.create({
  //     parentId: 0,
  //     nodeId: nodeID,
  //     path: '/home/index',
  //     element: '/home/index',
  //     meta: {
  //       title: '首页',
  //     },
  //   });
  // });


  return MenuModel;
};
