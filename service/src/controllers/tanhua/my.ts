import { config } from "../../config/config";

class MyController {
	// 获取用户信息
	static async userinfo(ctx: any) {
		let currentUserID = ctx.state.user.id; // 登录用户
		// 1.0 获取当前登录用户和目标用户信息
		try {
			let currentUser = await ctx.executeSql(`select * from dt_users where id = ${currentUserID}`);
			let resultData = currentUser[0];
			return ctx.send(resultData);
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	} 
	// 保存个人信息
	static async submitUserInfo(ctx: any) {
		// {
		//     "code": "10000",
		//     "msg": "请求成功",
		//     "data": {
		//       "id": 7,
		//       "vcode": "888888",
		//       "mobile": "18665711978",
		//       "email": null,
		//       "header": "/upload/18665711978.png",
		//       "nick_name": "一叶知秋",
		//       "age": 23,
		//       "gender": "男",
		//       "birthday": "1995-03-07T16:00:00.000Z",
		//       "city": "广州",
		//       "address": "广州市天河区珠吉路58号",
		//       "xueli": "本科",
		//       "amount": null,
		//       "status": 0,
		//       "lng": 113.42782,
		//       "lat": 23.12933,
		//       "Distance": 0,
		//       "login_time": "2023-08-31T10:01:21.000Z",
		//       "marry": "单身",
		//       "guid": "186657119781591501526289"
		//     }
		//   }
		const data = ctx.request.body;
		try {
			let sql = "update dt_users set ";
			if (data.header) {
				sql = sql + ` header = '${data.header}' ,`;
			}
			if (data.nickname) {
				sql = sql + ` nick_name = '${data.nickname}' ,`;
			}
			if (data.birthday) {
				sql = sql + ` birthday = '${data.birthday}' ,`;
			}
			if (data.age) {
				sql = sql + ` age = '${data.age}' ,`;
			}
			if (data.gender) {
				sql = sql + ` gender = '${data.gender}' ,`;
			}
			if (data.city) {
				sql = sql + ` city = '${data.city}' ,`;
			}
			if (data.address) {
				sql = sql + ` address = '${data.address}' ,`;
			}
			if (data.xueli) {
				sql = sql + ` xueli = '${data.xueli}' ,`;
			}
			if (data.marry) {
				sql = sql + ` marry = '${data.marry}' ,`;
			}
			if (data.mobile) {
				sql = sql + ` mobile = '${data.mobile}' ,`;
			}
			if (sql[sql.length - 1] === ",") {
				sql = sql.substr(0, sql.length - 1);
			}
			sql = sql + ` where mobile = '${ctx.state.user.name}'`;
			console.log("更新SQL：", sql);

			let resultData = await ctx.executeSql(sql);

			return ctx.send(resultData);
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 我的动态
	static async trends(ctx: any) {
		let query = ctx.request.query;
		let currentUserID = ctx.state.user.id; // 登录用户  7

		try {
			// 1.0 获取当前登录用户信息
			let currentUser = await ctx.executeSql(`select age, Distance from dt_users t where id = ${currentUserID}`);
			if (!currentUser.length) return ctx.sendError(config.resCodes.customerError, "用户信息获取失败,参数错误");
			let currentUserDistance = currentUser[0].Distance;

			// 2.0 获取符合条件的数据总条数    count(1)
			// let queryCount = `select * from  dt_trends t where ( ${currentUserID}=t.uid and t.status =0)`;
			let queryCount = `select count(1) as count  from  dt_trends t where ( ${currentUserID}=t.uid and t.status =0)`;
			let counts = await ctx.executeSql(queryCount);
			// console.log(counts) // uid=7的用户 tid=1,2,3的用户

			counts = counts[0].count; // count总条数 = 3
			let page = query.page || 1; // page页码 = 1
			let pagesize = query.pagesize || 10; // pagesize页数 = 10
			let pages = Math.ceil(counts / pagesize); // pages总页数 =  3 / 10
			let startIndex = (page - 1) * pagesize; // startIndex跳到哪页 (1-1) * 10

			// 3.0 分页获取数据   limit
			let sql = `
                select * from  
                    dt_trends t 
                where  
                    (${currentUserID}=t.uid and t.status =0)
                order by 
                    t.create_time DESC
                limit 
                    ${startIndex}, ${pagesize}
            `;
			let trends = await ctx.executeSql(sql);
			if (!trends.length) return ctx.sendError(config.resCodes.customerError, "无数据");

			// 4.0 补上每一条动态的相册图片
			let tids = trends.map((item: any) => item.tid).join(",");
			// console.log(tids); // 3,2,1
			let albums = await ctx.executeSql(`select  tid,thum_img_path,org_img_path  from dt_album where tid in (${tids})`);
			// console.log(albums)
			// Array(6)[]   [RowDataPacket {tid: 3,thum_img_path: '/upload/album/1_7_1.jpg',org_img_path: '/upload/album/1_7_1.jpg'}.....]

			let newtrends = trends.map((item: any) => {
				return {
					...item,
					// agediff: item.age - currentUser[0].age,
					images: albums.filter((a: any) => a.tid == item.tid),
				};
			});

			// 5.0 响应
			return ctx.send(newtrends, undefined, { counts, pagesize, pages, page });
			// {
			//     "code": "10000",
			//     "msg": "请求成功",
			//     "data": [
			//        // 3 items
			//     ],
			//     "counts": 3,
			//     "pagesize": "10",
			//     "pages": 1,
			//     "page": "1"
			//   }
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	/* 粉丝，喜欢，互相关注sql：
    -- 喜欢我的
        SELECT 'fanCount' AS type,COUNT(1) AS cout FROM dt_like WHERE type='like' AND uid = 13
        UNION ALL
        -- 我喜欢的
        SELECT 'loveCount' AS type,COUNT(1) AS fanCount FROM dt_like WHERE type='like' AND like_uid = 13
        UNION ALL
        -- 互相喜欢的
        SELECT 'eachLoveCount' AS type, COUNT(fanuser.uid) AS cout FROM (
        SELECT like_uid as uid FROM dt_like WHERE  type='like' AND uid = 13
        ) AS  fanuser,
        (
        SELECT uid  FROM dt_like WHERE type='like' AND like_uid = 13
        ) AS loveuser
        WHERE fanuser.uid = loveuser.uid
    */
	static async counts(ctx: any) {
		let currentUserID = ctx.state.user.id; // 登录用户
		// 1.0 获取当前登录用户和目标用户信息
		try {
			let sql = `
                SELECT 
                    'fanCount' AS type,COUNT(DISTINCT uid) AS cout
                FROM  dt_like  WHERE type='like' AND like_uid = ${currentUserID}
                -- SELECT * FROM  dt_like  WHERE type='like' AND like_uid = "7";
                -- type: fanCount   |  cout: 1

                UNION ALL

                SELECT
                    'loveCount' AS type,COUNT(DISTINCT like_uid) AS cout  
                FROM dt_like WHERE type='like' AND uid = ${currentUserID}
                -- type: loveCount   |  cout: 1

                UNION ALL

                SELECT
                    'eachLoveCount' AS type, COUNT(DISTINCT fanuser.uid) AS cout 
                FROM 
                    ( SELECT like_uid as uid  FROM dt_like WHERE  type='like' AND uid = ${currentUserID} ) AS fanuser,
                    ( SELECT uid  FROM dt_like WHERE type='like' AND like_uid = ${currentUserID} ) AS loveuser
                WHERE
                    fanuser.uid = loveuser.uid
            `;

			let list = await ctx.executeSql(sql); // 相互喜欢的eachLoveCount查询
			// console.log(list)
			// [
			//     RowDataPacket { type: 'fanCount', cout: 1 },  当前用户点赞的count
			//     RowDataPacket { type: 'loveCount', cout: 1 }, 当前用户喜欢的count
			//     RowDataPacket { type: 'eachLoveCount', cout: 0 } 互相喜欢的count
			// ]
			return ctx.send(list);
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 粉丝，喜欢，互相关注  列表返回 sql：
	/*
        -- 我喜欢的
        SELECT *  FROM( (SELECT DISTINCT  dt_like.like_uid from dt_like  WHERE type='like' AND uid =7 ) as dtl
            inner join dt_users t on (dtl.like_uid=t.id and t.status =0)) 
        -- 喜欢我的
       SELECT *  FROM( (SELECT DISTINCT  dt_like.uid from dt_like  WHERE type='like' AND like_uid =8 ) as dtl
            inner join dt_users t on (dtl.uid=t.id and t.status =0)) 
        UNION ALL
        -- 互相喜欢的
        select * from  ( select * from ( SELECT DISTINCT like_uid  FROM dt_like WHERE  type='like' AND uid = 8 ) AS  fanuser,
            ( SELECT DISTINCT uid  FROM dt_like WHERE type='like' AND like_uid = 8 ) 
            AS loveuser WHERE fanuser.like_uid = loveuser.uid )  as u inner join dt_users t on ( u.uid=t.id and t.status=0)  
    */
	static async likelist(ctx: any) {
		let currentUserID = ctx.state.user.id; // 登录用户
		try {
			// 我喜欢 SQL
			let ilikesql = `
                SELECT  *  FROM(
                    (
                        SELECT DISTINCT  dt_like.like_uid  as uid FROM dt_like  WHERE type='like'  AND uid=  ${currentUserID}  
                    ) as dtl
                    inner join 
                        dt_users t on (dtl.uid = t.id and t.status = 0)
                ) 
            `;
			// 喜欢我 SQL
			let likemesql = `
                SELECT * FROM (
                    (
                        SELECT DISTINCT dt_like.uid from dt_like WHERE type="like" AND like_uid = ${currentUserID}
                    ) as dtl
                    inner join 
                        dt_users t on (dtl.uid = t.id and t.status = 0)
                )
            `;
			// 互相喜欢 SQL
			let eachlikesql = `
                SELECT * FROM  (
                    SELECT uid FROM ( 
                        SELECT DISTINCT like_uid  FROM dt_like WHERE  type='like'  AND uid = ${currentUserID} 
                    ) AS  fanuser,
                    
                    ( SELECT DISTINCT uid  FROM dt_like WHERE type='like' AND like_uid = ${currentUserID} ) AS loveuser 
                    
                    WHERE fanuser.like_uid = loveuser.uid
                ) AS u
                inner join dt_users t on ( u.uid = t.id and t.status = 0) 
            `;

			let ilikelist = await ctx.executeSql(ilikesql); // length 1
			let likemelist = await ctx.executeSql(likemesql); // length 1
			let likeeachlist = await ctx.executeSql(eachlikesql); // length 0

			return ctx.send({ ilikelist, likemelist, likeeachlist }); // 粉丝，喜欢，互相关注  列表返回 sql：
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}
}

export default MyController;
