let data;

//* 连接数据库失败，连接地址 "mongodb://localhost";
data = {
	code: 10002,
	data: null,
	msg: "connect ECONNREFUSED ::1:27017",
};


// success({ ctx, res = null }) {
// 	ctx.status = res.status ? res.status : 200;
// 	if (res.status) {
// 		delete res.status;
// 	}
// 	ctx.body = {
// 		...res,
// 		data: res.data ? res.data : null,
// 		code: res.code ? res.code : 0, // 0代表成功，其他代表失败
// 		msg: res.msg ? res.msg : '请求成功',
// 	};
// },


// 返回客户端格式：
data = {
	code: 200,
	msg: "请求成功",
	data: {
		list: [{a:1}, {a:1}, {a:1}],
 		page: 1,
		pagesize: 5,
		count: 24,
	}
};





//* 写入一条成功
data = {
	code: "10000",
	msg: "请求成功",
	data: "682d2c516d4b518b387a232a",
	counts: 24,
	pagesize: 5,
	pages: 2,
	page: 1,
};

//* 写入多条成功
data = {
	code: "10000",
	msg: "请求成功",
	data: {
		acknowledged: true,
		insertedCount: 2,
		insertedIds: {
			"0": "682d36262f702f090502643b",
			"1": "682d36262f702f090502643c",
		},
	},
	pagesize: 5,
	pages: 2,
	page: 1,
};

//* 删除一条
data = {
	code: "10000",
	msg: "请求成功",
	data: true,
	counts: 0,
	pagesize: 5,
	pages: 2,
	page: 1,
};

//* 删除多条
data = {
  "code": "10000",
  "msg": "请求成功",
  "data": {
    "acknowledged": true,
    "deletedCount": 2
  },
  "counts": 1,
  "pagesize": 5,
  "pages": 2,
  "page": 1
}