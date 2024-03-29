/* eslint-disable strict */
const Service = require('egg').Service;


class AboutService extends Service {

  // 查询
  async index() {
    const { ctx } = this;
    const data = await ctx.model.About.findOne();
    // console.log('关于管理about -> 查询', data);
    // {
    //   tags: [ '标签1' ],
    //   createTime: 1660292733,
    //   updateTime: 1660655702,
    //   showResume: true,
    //   _id: 62f60e7da98d7c10accfc01b,
    //   imgs: [ [Object], [Object], [Object] ],
    //   desc: '测试aaaa'
    // }
    return {
      msg: '关于信息获取成功',
      data,
    };
  }

  // 新建：关于管理
  async create(params) {
    const { ctx } = this;
    const totalCount = await ctx.model.About.find().countDocuments();
    if (totalCount === 0) {
      const data = {
        ...params,
        createTime: ctx.helper.moment().unix(),
      };
      const res = await ctx.model.About.create(data);
      // console.log('关于管理about -> 新建', res);
      return {
        msg: '关于信息添加成功',
        data: res,
      };
    }
    return {
      msg: '关于信息已存在',
    };
  }


  // 更新：更新关于管理
  // findByIdAndUpdate
  async update(params) {
    const { ctx } = this;
    const oldAbout = await ctx.model.About.findOne({ _id: params.id });
    // console.log('findDocs：', oldAbout); // 查找到的数据
    if (oldAbout) {
      const updateData = {
        ...params,
        createTime: oldAbout.createTime,
        updateTime: ctx.helper.moment().unix(),
      };
      const res = await ctx.model.About.findByIdAndUpdate({ _id: params.id }, updateData, // @ findByIdAndUpdate
        {
          new: true, // 返回修改后的数据
          runValidators: true, // 执行Validaton验证
        }
      );
      // console.log('关于管理about -> 更新', res); // 更新成功后的数据
      return {
        msg: '关于信息修改成功',
        data: res,
      };
      // response ========>  {
      //   msg: '关于信息修改成功',
      //   data: {
      //     tags: [ '22222222', '33333333333', '44444444444', 'tag1', 'tag2' ],
      //     createTime: 1660292733,
      //     updateTime: 1710673132,
      //     showResume: true,
      //     _id: 62f60e7da98d7c10accfc01b,
      //     imgs: [ [Object], [Object] ],
      //     desc: '测试aaaa （详情）aaa 是'
      //   },
      //   code: 0
      // }
    }
    return {
      msg: '关于信息不存在',
    };
  }
}

module.exports = AboutService;
