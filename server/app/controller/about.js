'use strict';

const Controller = require('egg').Controller;

class AboutController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      imgs: {
        type: 'array',
        itemType: 'object',
        min: 1,
        max: 3,
        rule: {
          imgUrl: 'url',
          link: {
            type: 'string',
            required: false,
          },
        },
      },
      desc: {
        type: 'string',
        min: 1,
        max: 800,
      },
      tags: {
        type: 'array',
        itemType: 'string',
        min: 1,
        max: 20,
      },
      showResume: {
        type: 'boolean',
        default: false,
      },
    };
  }

  // 查询一条数据
  async index() {
    const { ctx, service } = this; // service.about:  AboutService {}
    const res = await service.about.index();
    // console.log(res);
    // {
    //   msg: '关于信息获取成功',
    //   data: {
    //     tags: [ '标签1' ],
    //     createTime: 1660292733,
    //     updateTime: 1660655702,
    //     showResume: true,
    //     _id: 62f60e7da98d7c10accfc01b,
    //     imgs: [ [Object], [Object], [Object] ],
    //     desc: '测试aaaa'
    //   }
    // }
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 创建一条数据
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.about.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 更新
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body; // TODO: 获取 body和id
    const id = ctx.params.id;
    console.log('关于管理参数：', ctx.params.id, ctx.request.body);
    // 62f60e7da98d7c10accfc01b {
    //   tags: [ '22222222', '33333333333', '44444444444', 'tag1', 'tag2' ],
    //   createTime: 1660292733,
    //   updateTime: 1710673132,
    //   showResume: true,
    //   _id: '62f60e7da98d7c10accfc01b',
    //   imgs: [
    //     {
    //       imgUrl: 'https://inews.gtimg.com/om_bt/OjPq2cnMN_-ivDKjxpCZ2kk_ab8YC5VMnL-0pQ21fUvd4AA/1000',
    //       link: 'https://inews.gtimg.com/om_bt/OjPq2cnMN_-ivDKjxpCZ2kk_ab8YC5VMnL-0pQ21fUvd4AA/1000'
    //     },
    //     {
    //       imgUrl: 'https://inews.gtimg.com/om_bt/OjPq2cnMN_-ivDKjxpCZ2kk_ab8YC5VMnL-0pQ21fUvd4AA/1000',
    //       link: ''
    //     }
    //   ],
    //   desc: '测试aaaa （详情）aaa 是 是'
    // }
    ctx.validate(this.createRule, data);
    const res = await service.about.update({ id, ...data });
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = AboutController;
