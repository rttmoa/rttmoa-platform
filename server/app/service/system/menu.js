/* eslint-disable no-unused-vars */
/* eslint-disable strict */
const Service = require('egg').Service;

class MenuService extends Service {

  // 查询菜单列表
  // @ 递归调用树结构
  async index(params) {
    console.log('menu params:', params);
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);

    // 查询菜单列表：根据条件查询
    const queryCon = {};
    const timeQuery = ctx.helper.getTimeQueryCon(params);
    const Query = {
      $and: [
        queryCon,
        timeQuery,
        {
          userName: {
            $regex: params.userName ? new RegExp(params.title, 'i') : '',
          },
        },
      ],
    };
    const totalCount = await ctx.model.System.Menu.find({}).countDocuments();
    const data = await ctx.model.System.Menu.find({})
      .sort({ loginTime: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // @ 递归调用树结构
    // function handleMenuChildren(menuList, parentId = 0) {
    //   const newMenuList = JSON.parse(JSON.stringify(menuList));
    //   return newMenuList.filter(item => item.parentId === parentId).map(item => {
    //     const children = handleMenuChildren(menuList, item.nodeId);
    //     if (children.length) {
    //       item.children = children;
    //     }
    //     return item;
    //   });
    // }
    function handleMenuChildren(menuList) {
      const newMenuList = JSON.parse(JSON.stringify(menuList));
      const menuDictionary = {};

      // 构建菜单字典
      newMenuList.forEach(item => {
        item.children = [];
        menuDictionary[item.nodeId] = item;
      });

      // 将子菜单添加到父菜单的 children 属性中
      newMenuList.forEach(item => {
        if (item.parentId !== 0) {
          const parentMenu = menuDictionary[item.parentId];
          if (parentMenu) {
            parentMenu.children.push(item);
          }
        }
      });

      // 返回根节点
      return newMenuList.filter(item => item.parentId === 0);
    }

    const menu = handleMenuChildren(data);
    console.log('处理后的菜单结构：', menu);
    return {
      data: {
        page,
        pageSize,
        totalCount,
        list: menu,
      },
    };
  }

  // 编辑菜单
  // 返回树结构菜单、供前端调整菜单层级
  // 返回nodeId数据 + 树结构菜单
  async edit(id) {
    const { ctx } = this;
    const oldMenu = await ctx.model.System.Menu.findOne({ nodeId: +id });
    // console.log('findMenu', oldMenu);
    if (!oldMenu) return { msg: '菜单不存在' };
    // 此处返回树结构菜单
    return {
      msg: '用户详情获取成功',
      data: oldMenu,
    };
  }

  // 更新菜单
  // 更新菜单后需要处理数据下有无children、并且处理element、redirect字段
  async update(params) {
    const { ctx } = this;
    const oldUser = await ctx.model.System.Menu.findOne({ _id: params.id });
    if (!oldUser) { return { msg: ' 用户不存在' }; }
    const updateData = {
      ...params,
      password: await ctx.helper.genSaltPassword(params.password),
      updateTime: Date.now(),
    };
    await ctx.model.System.Menu.updateOne({ _id: params.id }, updateData);
    return {
      msg: '用户修改成功！',
    };
  }

  // @创建菜单：说明
  // @新增菜单后需要处理数据下有无children、需要处理element、redirect字段
  // 添加一级分类时：pid为0
  // 添加二级分类时：pid为一级分类的nodeId
  // 添加三级分类时：pid为二级分类的nodeId
  async create(params) {
    const { ctx } = this;
    console.log('params', params);
    console.log('meta', params.meta);

    const pid = +(params.parentId);
    let gte = null;
    let lte = null;

    // pid为0时：nodeId在10-99之间 -- 创建一级分类
    if (pid === 0) {
      gte = 10;
      lte = 99;
    }
    // pid在10到99之间：nodeId在100-999之间 -- 创建二级分类
    if (pid >= 10 && pid <= 99) {
      gte = 100;
      lte = 999;
    }
    // pid在10到999之间：nodeId在1000-9999之间 -- 创建三级分类
    if (pid >= 100 && pid <= 999) {
      gte = 1000;
      lte = 9999;
    }
    console.log(pid);
    const findNodeId = await ctx.model.System.Menu.find({ nodeId: { $gte: gte, $lt: lte } }).sort({ nodeId: -1 });
    console.log(findNodeId);

    const NODEID = findNodeId.length ? findNodeId[0].nodeId + 1 : gte;
    const data = {
      parentId: pid,
      nodeId: NODEID,
      path: params.path,
      element: params.element,
      meta: params.meta,
    };
    const res = await ctx.model.System.Menu.create(data);
    return {
      msg: '菜单添加成功',
      data: res,
    };
  }

  // 删除菜单
  // 如果删除一级菜单，如果有子菜单，需要先删除子菜单才能删除一级菜单
  // 如果删除二级菜单，判断一级菜单下是否有children、需要处理处理element、redirect字段
  async destroy(id) {
    const { ctx } = this;
    try {
      const oldMenu = await ctx.model.System.Menu.findOne({ _id: id });
      if (!oldMenu) {
        return {
          msg: '菜单不存在',
        };
      }
      // await ctx.model.System.Menu.deleteOne({ _id: id });
      return {
        msg: '菜单删除成功',
      };
    } catch (error) {
      console.log(error);
    }

  }
}

module.exports = MenuService;
