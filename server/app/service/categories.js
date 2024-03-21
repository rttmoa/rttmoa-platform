/* eslint-disable strict */
const Service = require('egg').Service;

class CategoriesService extends Service {


  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params); // 过滤掉page&pageSize属性
    console.log('分类查询categories - 查询', params); // { name: '图片' }

    // name 是模糊匹配
    const queryCon = params.name ? { name: { $regex: new RegExp(params.name, 'i') } } : {};

    const totalCount = await ctx.model.Categories.find(queryCon).countDocuments();
    const data = await ctx.model.Categories.find(queryCon)
      .sort({ createTime: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    console.log('data', data);
    // TODO: 返回给控制器
    return {
      data: {
        page,
        pageSize,
        totalCount,
        list: data,
      },
    };
  }

  // 创建分类 （先查询再添加）
  async create(params) {
    const { ctx } = this;
    const oldTags = await ctx.model.Categories.findOne({
      name: params.name,
    });
    if (oldTags) {
      return {
        msg: '该分类已存在',
      };
    }
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Categories.create(data);
    return {
      msg: '分类添加成功',
      data: res,
    };
    // 失败：response ========>  { msg: '该分类已存在', data: null, code: 0 }
    // 成功：response ========>  response ========>
    // {
    //   msg: '分类添加成功',
    //   data: {
    //     createTime: 1710669563,
    //     updateTime: 0,
    //     articleNum: 0,
    //     _id: 65f6befb6ee11d28ecaed985,
    //     name: '数码'
    //   },
    //   code: 0
    // }
  }


  async update(params) {
    const { ctx } = this;
    const oldTags = await ctx.model.Categories.findOne({ _id: params.id });
    if (oldTags) {
      const oldNameTags = await ctx.model.Categories.findOne({ name: params.name });
      if (oldNameTags) {
        return {
          msg: '分类已存在，请重新修改',
        };
      }
    }
    const updateData = {
      updateTime: ctx.helper.moment().unix(),
      name: params.name,
    };
    await ctx.model.Categories.updateOne({ _id: params.id }, updateData);
    return {
      msg: '分类修改成功',
    };
  }


  // 删除分类 （先查询再删除）
  async destroy(id) {
    const { ctx } = this;
    const oldTags = await ctx.model.Categories.findOne({ _id: id });
    if (!oldTags) {
      return {
        msg: '分类不存在',
      };
    }
    await ctx.model.Categories.deleteOne({ _id: id });
    return {
      msg: '分类删除成功',
    };
  }

}

module.exports = CategoriesService;
