/* eslint-disable no-unused-vars */
/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FindSchema = new Schema(
    {
      name: {
        type: 'string',
      },
      age: {
        type: 'number',
      },
      // tags: [ String ],
      createTime: {
        type: Date,
        default: Date.now(),
      },
      updateTime: {
        type: Date,
        default: Date.now(),
      },
    },
    {
      collection: 'find',
      versionKey: false,
    }
  );
  const findModel = mongoose.model('Find', FindSchema);
  // findModel.create({
  //   name: 'zhaoliu',
  //   age: 13,
  // });
  findModel.find().then(res => { console.log('总数量：', res.length); }); // 6
  // 比较操作符
  // $eq	查询与条件值相同的文档
  // findModel.find({ name: { $eq: 'a' } }).then(res => { console.log('结果：', res.length); });
  // $ne	查询与条件值不相同或者不存在的文档
  // findModel.find({ name: { $ne: 'a' } }).then(res => { console.log('结果：', res.length); });
  // $gt	查询大于条件值的文档
  // $gte	查询大于等于条件值的文档
  // $lt	查询小于条件值的文档
  // $lte	查询小于等于条件值的文档
  // $in	筛选字段值与数组中任一元素吻合的文档
  // $nin	筛选字段值不在数组元素中的文档

  // 逻辑操作符
  // $and	用于连接多个查询条件，表示查询的文档必须符合所有条件。
  // $or	用于连接多个查询条件，表示查询的文档符合其中一个条件即可。
  // $nor	用于连接多个查询条件，表示查询的文档必须不符合所有条件。当字段不存在时，也符合条件。
  // $not	用于连接多个查询条件于一个查询条件，表示查询的文档必须不符合该条件。当字段不存在时，也符合条件。

  // 元素操作符
  // $exists	依据字段是否存在来筛选文档。可选true、false。
  // $type	依据字段的类型来筛选文档。

  // 评估操作符
  // $expr	用来对文档中的两个字段进行比较，进而查询出符合条件的文档。
  // $mod	查询字段值符合余数条件的文档。
};
