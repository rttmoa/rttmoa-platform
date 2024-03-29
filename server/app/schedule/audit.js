/* eslint-disable strict */
/* eslint-disable no-unused-vars */
module.exports = app => {
  return {
    schedule: {
      cron: '0 */30 * * * *', // 每30分钟执行一次
      // cron: '0 0 */3 * * *', // 每三小时准点执行一次
      // interval: "10s",
      type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
      await ctx.model.Comment.updateMany({ auditStatus: '3' }, { auditStatus: '1', auditTime: ctx.helper.moment().unix() });
    },
  };
};
