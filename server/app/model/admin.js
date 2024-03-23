/* eslint-disable strict */
const helper = require('../extend/helper');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AdminSchema = new Schema(
    {
      userName: {
        type: String,
        min: 5,
        max: 20,
        match: /^[\u4e00-\u9fa5A-Za-z0-9_]{5,20}$/,
      },
      password: { type: String },
    },
    {
      collection: 'admin',
      versionKey: false,
    }
  );

  const AdminModel = mongoose.model('Admin', AdminSchema);

  const adminUser = {
    userName: 'admin',
    password: 'Wenc1101',
  };
  helper.genSaltPassword(adminUser.password).then(async hash => {
    // console.log('------> admin 创建');
    // console.log(hash);
    // console.log('\n\n\n\n\n\n');
    const oldUser = await AdminModel.find({ userName: adminUser.userName });
    if (oldUser.length === 0) {
      adminUser.password = hash; // hash: $2b$10$sVjj6PgSfDD.JrrHrJ1TwexGH.34z8C8HXsTeY3ejMs1I063At.xi
      AdminModel.create(adminUser);
    }
  });

  return AdminModel;
};
