/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CommentSchema = new Schema(
    {
      // 昵称
      nickName: {
        type: 'string',
        required: false,
        max: 20,
      },
      // 邮箱
      email: {
        type: 'string',
        required: true,
        match: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      },
      // 头像
      avatar: {
        type: 'string',
        required: false,
      },
      //  文章ID
      articleId: {
        type: 'ObjectId',
      },
      // 文章标题
      articleTitle: {
        type: 'string',
        min: 2,
        max: 200,
      },
      // 目标回复ID
      targetReplayId: {
        type: 'string',
        required: false,
        default: '',
      },
      // 目标回复内容
      targetReplayContent: {
        type: 'string',
        required: false,
        max: 200,
        default: '',
      },
      // 当前回复内容
      currentReplayContent: {
        type: 'string',
        required: false,
        max: 200,
        default: '',
      },
      // 评论时间
      commentTime: {
        type: 'number',
        default: 0,
      },
      // 审核时间
      auditTime: {
        type: 'number',
        default: 0,
      },
      // 审核状态
      auditStatus: {
        type: 'string', // 0=全部 1=通过 2=驳回 3=未审核
        default: '3',
      },
    },
    {
      collection: 'comment',
      versionKey: false,
    }
  );

  return mongoose.model('Comment', CommentSchema);
};
