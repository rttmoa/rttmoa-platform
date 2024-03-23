/* eslint-disable strict */
const Service = require('egg').Service;

class CategoryService extends Service {


  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);
    console.log('分类查询categories - 查询', params);

    let data = null;
    let totalCount = 0;
    if (params.parentId === '0') {
      const queryCon = params.name ? { name: { $regex: new RegExp(params.name, 'i') } } : {};
      // const queryPar = params.parentId === '0' ? { parentId: { $eq: '0' } } : { parentId: { $ne: '0' } };
      const queryPar = params.parentId === '0' ? { parentId: { $eq: '0' } } : { _id: { $eq: params.parentId } };
      totalCount = await ctx.model.Module.Category.find({ ...queryCon, ...queryPar }).countDocuments();
      data = await ctx.model.Module.Category.find({ ...queryCon, ...queryPar })
        .sort({ createTime: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    } else {
      const queryPar = params.parentId === '0' ? { parentId: { $eq: '0' } } : { parentId: { $eq: params.parentId } };
      totalCount = await ctx.model.Module.Category.find({ ...queryPar }).countDocuments();
      data = await ctx.model.Module.Category.find({ ...queryPar })
        .sort({ createTime: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    }

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
    const oldTags = await ctx.model.Module.Category.findOne({
      name: params.name,
    });
    if (oldTags) {
      return {
        msg: '该分类已存在',
      };
    }
    // 参数parentId如果是0或65fbed951ef97f5be8252a4b时
    const data = {
      ...params,
      updateTime: Date.now(),
      createTime: Date.now(),
    };
    const res = await ctx.model.Module.Category.create(data);
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

  // 更新分类时：要注意是更新的是一级分类还是二级分类
  async update(params) {
    const { ctx } = this;
    const oldTags = await ctx.model.Module.Category.findOne({ _id: params.id });
    if (oldTags) {
      const oldNameTags = await ctx.model.Module.Category.findOne({ name: params.name });
      if (oldNameTags) {
        return {
          msg: '分类已存在，请重新修改',
        };
      }
    }
    const updateData = {
      updateTime: Date.now(),
      name: params.name,
    };
    await ctx.model.Module.Category.updateOne({ _id: params.id }, updateData);
    return {
      msg: '分类修改成功',
    };
  }


  // 删除分类时：要注意是更新的是一级分类还是二级分类，如果一级分类下有二级分类，则不能删除
  async destroy(id) {
    const { ctx } = this;
    const oldTags = await ctx.model.Module.Category.findOne({ _id: id });
    if (!oldTags) {
      return {
        msg: '分类不存在',
      };
    }
    await ctx.model.Module.Category.deleteOne({ _id: id });
    return {
      msg: '分类删除成功',
    };
  }

}

module.exports = CategoryService;
