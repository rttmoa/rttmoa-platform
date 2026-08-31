import { Context } from "koa";
import Basic from "../basic";


class Operate extends Basic {
  constructor() {
    super();
  }

  findOperate = async (ctx: Context) => {
    try {
      const data: any = ctx.request.body;

      // 添加分页和排序的默认值
      const page = Math.max(1, Number(data.pagination?.page) || 1);
      const pageSize = Math.min(100, Math.max(1, Number(data.pagination?.pageSize) || 10));

      const [count, list] : any= await Promise.all([
        // ctx.mongo.count('__operate', {}),
        // ctx.mongo.find('__operate', {
        //   query: {},
        //   page: 1,
        //   pageSize: 10,
        //   sort: data.sort || { postSort: 1, createTime: -1 },
        // }),
      ]);

      return ctx.send({
        list: [],
        page,
        pageSize,
        total: 10,
      });
    } catch (err: any) {
      return ctx.sendError(500, err.message);
    }
  };


  addOperate = async (ctx: Context) => {

  }
}

export default new Operate();
