import { config } from "../../config/config";

class MessageController {
	// 分页获取点赞列表
	/* sql语句：
    SELECT MAX(ds.sid) AS id,
        CONCAT('${global.domain}',du.header) as avatar,
        du.nick_name,
        du.mobile,
        MAX(ds.create_time) AS updateDate,
        CONCAT(COUNT(1),'次点赞了你的朋友圈') AS content,
        ds.star_uid,
        0 AS unReadMsgCount
        FROM dt_star ds 
        inner join dt_users du on (ds.star_uid = du.id)
        WHERE ds.uid=7 -- 登录的用户id
        GROUP by ds.star_uid
        ORDER by updateDate desc    
    */
	static async starlist(ctx: any) {
		try {
			let currentUserID = ctx.state.user.id; // 登录用户
			let query = ctx.request.query;
			console.log(currentUserID); // 7
			console.log(query); //  { page: '2', pagesize: '10' }

			// 分页数据
			let queryCount = `
                -- 根据子查询查到的数据 COUNT
                -- 如果 查看子查询中的数据 select * from ( ... ) AS t
                SELECT COUNT(1) as count FROM (
                    -- 子查询中查询sid=7的用户 uid=7点赞给star_id的所有用户（7,8,9,15,75）
                    -- t1: dt_star   t2: dt_users
                    SELECT
                        MAX(ds.sid) AS id,
                        CONCAT('${config.global}',du.header) as avatar,
                        du.nick_name,
                        du.mobile,
                        MAX(ds.create_time) AS updateDate,
                        CONCAT(COUNT(1),'次点赞了你的朋友圈') AS content,
                        ds.star_uid,
                        0 AS unReadMsgCount
                    FROM
                        dt_star ds
                    inner join
                        dt_users du on (ds.star_uid = du.id)
                    WHERE
                        ds.uid=7 -- 登录的用户id
                    GROUP by
                        ds.star_uid
                ) AS t
            `;
			// console.log(queryCount)
			//  获取总条数
			let counts = await ctx.executeSql(queryCount);
			// console.log(counts) // [ RowDataPacket { count: 5 } ]   --   uid=7点赞给star_id的所有用户（7,8,9,15,75）

			counts = counts[0].count;
			let page = query.page;
			let pagesize = query.pagesize;
			let pages = Math.ceil(counts / pagesize);
			let startIndex = (page - 1) * pagesize;

			let starList = await ctx.executeSql(`
                SELECT 
                    MAX(ds.sid) AS id,
                    CONCAT('${config.global}',du.header) as avatar,
                    du.nick_name,
                    du.mobile,
                    MAX(ds.create_time) AS updateDate,
                    CAST(CONCAT(COUNT(1),'次点赞了你的朋友圈') AS CHAR) AS content,
                    ds.star_uid,
                    0 AS unReadMsgCount
                FROM 
                    dt_star ds 
                inner join 
                    dt_users du on (ds.star_uid = du.id)
                WHERE 
                    ds.uid= ${currentUserID}
                GROUP by 
                    ds.star_uid
                ORDER by 
                    updateDate desc 
            `);
			// console.log(starList) // 上面子查询中的5条数据

			// 5.0 响应
			return ctx.send(starList, undefined, { counts, pagesize, pages, page });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
		// 响应的结果：
		// {
		// "code": "10000",
		// "msg": "请求成功",
		// "data": [
		//     {
		//     "id": 77,
		//     "avatar": "http://localhost:9089/upload/159342378739018665711111.jpg",
		//     "nick_name": "柜台机",
		//     "mobile": "18665711111",
		//     "updateDate": "2020-06-18T07:08:31.000Z",
		//     "content": "1次点赞了你的朋友圈",
		//     "star_uid": 75,
		//     "unReadMsgCount": 0
		//     },
		//     {
		//     "id": 28,
		//     "avatar": "http://localhost:9089/upload/18665711978.png",
		//     "nick_name": "一叶知秋",
		//     "mobile": "18665711978",
		//     "updateDate": "2019-12-13T03:30:19.000Z",
		//     "content": "3次点赞了你的朋友圈",
		//     "star_uid": 7,
		//     "unReadMsgCount": 0
		//     },
		//     {
		//     "id": 7,
		//     "avatar": "http://localhost:9089/upload/13828459787.jpg",
		//     "nick_name": "镜湖月",
		//     "mobile": "13828459787",
		//     "updateDate": "2019-12-06T07:18:05.000Z",
		//     "content": "1次点赞了你的朋友圈",
		//     "star_uid": 15,
		//     "unReadMsgCount": 0
		//     },
		//     {
		//     "id": 6,
		//     "avatar": "http://localhost:9089/upload/13828459783.jpg",
		//     "nick_name": "醉挽清风",
		//     "mobile": "13828459783",
		//     "updateDate": "2019-12-06T07:17:26.000Z",
		//     "content": "1次点赞了你的朋友圈",
		//     "star_uid": 9,
		//     "unReadMsgCount": 0
		//     },
		//     {
		//     "id": 5,
		//     "avatar": "http://localhost:9089/upload/13828459782.png",
		//     "nick_name": "雾霭朦胧",
		//     "mobile": "13828459782",
		//     "updateDate": "2019-12-06T07:16:26.000Z",
		//     "content": "2次点赞了你的朋友圈",
		//     "star_uid": 8,
		//     "unReadMsgCount": 0
		//     }
		// ],
		// "counts": 5,
		// "pagesize": "10",
		// "pages": 1,
		// "page": "2"
		// }
	}
}

export default MessageController;
