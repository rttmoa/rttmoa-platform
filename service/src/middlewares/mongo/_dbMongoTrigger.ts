const { MongoClient } = require('mongodb');

async function watchChanges() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('test');
  const collection = db.collection('users');

  const changeStream = collection.watch();

  changeStream.on('change', (change: any) => {
    console.log('Change detected:', change);
    // 可根据 change.operationType 判断 insert/update/delete
  });
}
// watchChanges();



// * Trigger Mongodb 实现“触发器”功能  —  持续监听表变化