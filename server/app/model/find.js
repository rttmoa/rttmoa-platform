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
  // console.log('find;;;;;;;;;;;;;;;;;;;;;;;;;;');

  // findModel.create({
  //   name: 'zhaoliu',
  //   age: 13,
  // });

  // ! CURD
  //
  //
  //
  //

  // @增加操作
  // findModel.create({ name: 'zhaoliu', age: 1 }).then(res => console.log(res));
  // findModel.insert({ name: 'zhaoliu', age: 14 }).then(res => console.log(res));
  // findModel.insertOne({ name: 'zhaoliu', age: 15 }).then(res => console.log(res));

  // @查询操作
  // 无条件查询集合中文档
  // findModel.find().then(res => console.log(res.length));
  // 带条件查询集合中文档
  // findModel.find({ name: 'zhaoliu' }).then(res => console.log(res.length));
  // 查询一个文档
  // findModel.findOne({ name: 't1' }).then(res => console.log(res));
  // findModel.findOne(null || {}).then(res => console.log(res));

  // mongodb操作符
  // findModel.find({}, { name: 'zhaoliu' }).then(res => console.log(res.length)); // “_id”始终会被获取  投影查询
  // findModel.find({}, { name: 'zhaoliu', _id: 0 }).then(res => console.log(res.length)); // ”_id”不会被获取  投影查询
  // findModel.find({ $or: [{ name: 'b' }, { name: 'c' }], age: 12 }).then(res => console.log(res.length)); // 复合查询（或者，并且）
  // findModel.find({ name: { $type: 'string' } }).then(res => console.log(res.length)); // type查询
  // findModel.find({ name: { $in: [ /^l/, /^z/ ] } }); // 正则查询：https://blog.csdn.net/qq_62178197/article/details/131373646
  // findModel.find().limit(2).skip(3)
  //   .then(res => console.log(res)); // 分页查询
  // findModel.find().sort({ age: 1, name: -1 }).then(res => console.log(res)); // 查询排序

  // @更新
  // findModel.update({ name: 't1' }, { name: 't2', age: 2 }).then(res => console.log(res));
  // findModel.update({ name: 'zhang' }, { $set: { name: 'li' } }).then(res => console.log(res)); // set会判断set的字段存在则修改，不存在则添加
  // findModel.updateOne({ _id: '65fef38e7335aa52d4f8160b' }, { name: 'One' }).then(res => console.log(res));
  // findModel.updateOne({ _id: '65fef38e7335aa52d4f8160b' }, { $inc: { age: -2 } }).then(res => console.log(res)); // 数量 - 2
  // findModel.updateMany({}, { updateTime: Date.now() }).then(res => console.log(res));
  // findModel.findByIdAndUpdate({ _id: '65fef38e7335aa52d4f8160b' }, { name: 'One1' }, { new: true, runValidators: true }).then(res => console.log(res));

  // @删除操作
  // findModel.remove({ age: 99 }).then(res => console.log('操作结果：', res));
  // findModel.deleteOne({ age: 99 }).then(res => console.log('操作结果：', res)); // n / deltedCount
  // findModel.deleteMany({ age: 33 }).then(res => console.log('操作结果：', res)); // deletedCount: 3


  // ! 下面为查询语法：聚合查询、正在查询、数据查询、逻辑操作符、元素操作符、评估操作符
  //
  // 创建数据便于以下的测试(删除全部文档，再创建)
  // findModel.create({ name: 'a', age: 11 });
  // findModel.create({ name: 'b', age: 12 });
  // findModel.create({ name: 'c', age: 13 });
  // findModel.create({ name: 'd', age: 14 });
  // findModel.create({ name: 'e', age: 15 });
  // findModel.create({ name: 'f', age: 16 });

  // findModel.find().then(res => {
  //   console.log('总数量：', res.length);
  // }); // 6


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
