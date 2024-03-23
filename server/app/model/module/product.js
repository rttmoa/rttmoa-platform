/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ProductSchema = new Schema(
    {
      // 商品名称
      productName: {
        type: String,
        min: 2,
        max: 200,
      },
      // 主图
      productImg: {
        type: String,
      },
      // 价格
      productPrice: {
        type: 'number',
        default: 0,
      },
      // 是否在售
      productOnsale: {
        type: 'number',
        default: 0,
      },
      // 商品描述
      productDesc: {
        type: String,
        min: 10,
        max: 500,
      },
      // 创建时间
      createTime: {
        type: Date,
        default: Date.now(),
      },
      // 更细时间
      updateTime: {
        type: Date,
        default: Date.now(),
      },
    },
    {
      collection: 'product',
      versionKey: false,
    }
  );

  return mongoose.model('Product', ProductSchema);
};
