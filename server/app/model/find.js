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

  // findModel.find().then(res => {
  //   console.log('总数量：', res.length);
  // }); // 6


  // @下面为查询语法：聚合查询、正在查询、数据查询、逻辑操作符、元素操作符、评估操作符

  // @聚合查询
  // 聚合查询是指对数据库中的数据进行分组、计数、求和等操作。在MongoDB中，我们可以使用聚合管道来实现聚合查询。
  // - $match：对输入文档进行过滤。
  // - $group：对输入文档进行分组。
  // - $project：对输入文档进行投影。
  // - $sort：对输入文档进行排序。
  // - $limit：限制输出文档的数量。
  // - $skip：跳过指定数量的文档。
  // 		db.users.aggregate([
  // 			{ $group: { _id: "$gender", count: { $sum: 1 } } }
  // 		])


  // @正则匹配查询  $regex
  // .find({ username: { $regex: "john", $options: "i" } })
  // .find({ username: { $regex: "john|jane" } })
  // .find({name: /jo/i})

  // @比较操作符  ==  !=  >  >=  <  <=
  // $eq	===		查询与条件值相同的文档 （where name='张三'）
  // findModel.find({ name: { $eq: 'a' } }).then(res => { console.log('结果：', res.length); });

  // $ne	!== 	查询与条件值不相同或者不存在的文档 （where score != 80）
  // findModel.find({ name: { $ne: 'a' } }).then(res => { console.log('结果：', res.length); });

  // $gt	>  查询大于条件值的文档 （where score>80）
  // findModel.find({ age: { $gt: 13 } }).then(res => { console.log('结果：', res.length); }); // 14, 15

  // $gte	 >=  查询大于等于条件值的文档 （where score>=80）
  // findModel.find({ age: { $gte: 13 } }).then(res => { console.log('结果：', res.length); }); // 13, 14, 15

  // $lt  <  查询小于条件值的文档 (where score<80)
  // findModel.find({ age: { $lt: 13 } }).then(res => { console.log('结果：', res.length); }); // 10, 11, 12

  // $lte  <=  查询小于等于条件值的文档(where score<=80)
  // findModel.find({ age: { $lte: 13 } }).then(res => { console.log('结果：', res.length); }); // 10, 11, 12, 13

  // 12 < x  &&  x > 16
  // findModel.find({ age: { $gt: 12, $lt: 16 } }).then(res => { console.log('结果：', res); }); // 年龄大于50并且小于100

  // @数组查询  $in $nin
  // $in	筛选字段值与数组中任一元素吻合的文档
  // findModel.find({ name: { $in: [ 'a', 'b', 'c' ] } }).then(res => { console.log('结果：', res.length); }); // 3

  // $nin	筛选字段值不在数组元素中的文档
  // findModel.find({ name: { $nin: [ 'a', 'b' ] } }).then(res => { console.log('结果：', res.length); }); // 4

  // @逻辑操作符  $and $or $not
  // $and	用于连接多个查询条件，表示查询的文档必须符合所有条件。
  // findModel.find({ name: { $in: [ 'a' ] }, age: { $eq: 10 } }).then(res => { console.log('结果：', res); });
  // findModel.find({ $and: [{ name: { $in: [ 'a' ] } }, { age: { $eq: 10 } }] }).then(res => { console.log('结果：', res); });

  // $or	用于连接多个查询条件，表示查询的文档符合其中一个条件即可。  { $or: [{ key1: value1 }, { key2: value2 }] }
  // findModel.find({ $or: [{ name: { $in: [ 'a' ] } }, { name: { $eq: 'b' } }, { age: { $eq: 15 } }] }).then(res => { console.log('结果：', res); });

  // $nor	用于连接多个查询条件，表示查询的文档必须不符合所有条件。当字段不存在时，也符合条件。
  // findModel.find({ $nor: [{ name: { $eq: 'a' } }, { age: { $eq: 15 } }] }).then(res => { console.log('结果：', res); });
  // $not	用于连接多个查询条件于一个查询条件，表示查询的文档必须不符合该条件。当字段不存在时，也符合条件。

  // @元素操作符  $exists $type
  // $exists	依据字段是否存在来筛选文档。可选true、false。
  // findModel.find({ name: { $exists: true } }).then(res => { console.log('结果：', res); });
  // $type	依据字段的类型来筛选文档。
  // db.collections.find({“name”:{“$type”:”string”}})

  // @评估操作符
  // $expr	用来对文档中的两个字段进行比较，进而查询出符合条件的文档。
  // $mod	查询字段值符合余数条件的文档。


  return findModel;
};
