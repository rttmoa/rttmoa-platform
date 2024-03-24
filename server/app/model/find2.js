/* eslint-disable no-unused-vars */
/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const Find2Schema = new Schema(
    {
      name: {
        type: 'string',
      },
      age: {
        type: 'number',
      },
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
      collection: 'find2',
      versionKey: false,
    }
  );
  const f2 = mongoose.model('Find2', Find2Schema);

  // @增加操作
  // f2.create({ name: 'zhaoliu', age: 13 });
  // f2.insert({ name: 'zhaoliu', age: 14 });
  // f2.insertOne({ name: 'zhaoliu', age: 15 });

  // @查询操作
  // 无条件查询集合中文档
  // db.collections.find();
  // 带条件查询集合中文档
  // db.collections.find({“age”:30})
  // 查询一个文档
  // f2.findOne().then(res => console.log(res));
  // f2.findOne({}).then(res => console.log(res));
  // f2.findOne({ age: 20 }).then(res => console.log(res));

  // db.collections.find({},{“name”:1}) //“_id”始终会被获取  投影查询
  // db.collections.find({},{“name”:1,”_id”:0})//”_id”不会被获取  投影查询
  // db.collections.find({“$or”:[{“name”:”zhangsan”},{“age”:25}],”sex”:1}) // 复合查询（或者，并且）
  // db.collections.find({“name”:{“$type”:”string”}}) // type查询
  // f2.find({“name”:{“$in”:[/^l/,/^z/]}})  // 正则查询：https://blog.csdn.net/qq_62178197/article/details/131373646
  // f2.find().limit().skip() // 分页查询
  // f2.find().sort({ age: -1, name: 1 }) // 查询排序


  // @更新
  // f2.update({“name”:”zhang”},{“name”:”li”,”age”:15})
  // f2.update({“name”:”zhang”},{“$set”:{“name”:”li”}}) // set会判断set的字段存在则修改，不存在则添加

  // @删除操作
  // f2.remove({ age: 14 }).then(res => console.log('操作结果：', res));
  // f2.deleteOne({ age: 14 }).then(res => console.log('操作结果：', res)); // n / deltedCount
  // f2.deleteMany({ age: 14 }).then(res => console.log('操作结果：', res)); // deletedCount: 3

  // return f2;
};
