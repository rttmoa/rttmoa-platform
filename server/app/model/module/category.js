/* eslint-disable no-unused-vars */
/* eslint-disable strict */
// 分类管理
// 每条数据：
// 一级分类
// {
// 	"_id": "5ed23473dsf78dfg68",
//   "parentId": "0",
//   "name": "家用电器",
// }
// 二级分类：
// {
// 	"parentId": "5e12b8bce31bb727e4b0e348",
// 	"_id": "5fc30a1833fe4221c4546275",
// 	"name": "冰箱",
// 	"__v": 0
// },
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;
  const CategorySchema = new Schema(
    {
      // _id: {
      // 	type: ObjectId, // 类型为ObjectId类型
      // }
      name: {
        type: String,
        min: 2,
        max: 20,
        match: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
        // required: true
      },
      parentId: {
        type: String,
        default: '',
        // ref: 'Category',
        // required: true,
      },
      createTime: {
        type: Date,
        default: Date.now,
      },
      updateTime: {
        type: Date,
        default: 0,
      },
    },
    {
      collection: 'category',
      versionKey: false,
    }
  );
  const CategoryModel = mongoose.model('Category', CategorySchema);
  // 创建一个分类
  // CategoryModel.create({ name: '家用电器', parentId: '0', createTime: Date.now(), updateTime: Date.now() });
  // 查询一个分类
  // CategoryModel.find({ name: '家用电器' }).then(category => {
  //   console.log(category.length);
  // });
  return CategoryModel;
};
