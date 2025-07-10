import { config } from "../../config/config";

class FriendsController {
	/**
     * ? 最近来访（表dt_users、dt_visits；访客） 
     * SQL1; 通过 dt_visits dt_users 表查询访客的信息
        SELECT 
            distinct v.target_uid,v.uid,du.nick_name,du.age,du.xueli,du.marry,du.gender,du.Distance, du.header 
        FROM 
            dt_visits v
        INNER JOIN 
            dt_users du ON (v.uid = du.id)
        WHERE 
            v.target_uid = 7
        LIMIT 0, 4;
     */
	static async visitors(ctx: any) {
		console.log("===================>  最近来访 接口SQL");
		try {
			let currentUserID = ctx.state.user.id;
			// 1.0 获取当前登录用户信息
			let currentUser = await ctx.executeSql(`select  * from dt_users where mobile='${ctx.state.user.name}'`);

			// ? sql 语句：
			let sql = `
                SELECT 
                    distinct v.target_uid,v.uid,du.nick_name,du.age,du.xueli,du.marry,du.gender,du.Distance, du.header 
                FROM 
                    dt_visits v
                INNER JOIN 
                    dt_users du ON (v.uid = du.id)
                WHERE 
                    v.target_uid = ${currentUserID} 
                LIMIT 0, 4
            `;
			let visitors = await ctx.executeSql(sql);

			// 5.0 补上 缘分值 fateValue 和年龄差 agediff两个响应字段
			if (visitors && visitors.length > 0) {
				let newList = visitors.map((user: any) => {
					// 修改数据的： 相差距离，年龄差，缘分值
					return {
						...user,
						Distance: Math.abs(user.Distance - currentUser[0].Distance),
						agediff: user.age - currentUser[0].age,
						fateValue: getfateValue(user, currentUser[0]),
					};
				});
				return ctx.send(newList);
			} else {
				return ctx.send([]);
			}
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	/**
     * ? 今日佳人，总体逻辑与推荐朋友一样，只是区缘分值最高的那一条
     * 今日佳人SQL; 根据当前用户距离 查询条件； 1.其他用户的最后登陆时间（login_time 1年或3年） 2.与当前用户的距离查询（距离值 100千米）  
        SELECT t.id,t.header,t.nick_name,t.gender,t.age,t.marry,t.xueli,t.dist,t.login_time FROM (
            SELECT *, TIMESTAMPDIFF(MINUTE,login_time,NOW()) AS timestampdif, ABS(Distance - 6284) AS dist FROM dt_users 
            where status = 0 and xueli = "大专" and address like "%天河区%" and gender = "女" and age >= 17 and age <= 25
        ) AS t
        WHERE t.timestampdif <= 15768000000 AND t.dist <= 10000000000;
     */
	static async todayBest(ctx: any) {
		try {
			let query = ctx.request.query;
			// 1.0 获取当前登录用户信息
			let currentUser = await ctx.executeSql(`select * from dt_users where mobile='${ctx.state.user.name}'`);

			// 2.0 条件组合 （where；状态、性别、年龄差）
			let innerwhere = " WHERE status = 0 ";
			// innerwhere += ` and xueli = '${currentUser[0].xueli}'`;
			// innerwhere += ` and address like '%${currentUser[0].city}%'`;
			if (currentUser && currentUser.length > 0 && currentUser[0].age > 0) {
				innerwhere += ` and gender = '${currentUser[0].gender == "女" ? "男" : "女"}'`;
				let minAge = currentUser[0].age - 5; // 当前登录用户的年龄减去5岁
				let maxAge = currentUser[0].age + 5;
				innerwhere += ` and age >= ${minAge} and age <= ${maxAge} `;
			}

			// 3.0 查询sql语句
			let diffMinute = 1440 * 365; // 默认是1年
			if (query.lastLogin == "15分钟") {
				diffMinute = 15;
			}
			if (query.lastLogin == "1小时") {
				diffMinute = 60;
			}
			if (query.lastLogin == "1天") {
				diffMinute = 1440;
			}

			let disnum = 1000 * 100; // 默认是100KM范围
			if (query.distance) disnum = query.distance;

			// ? sql 语句：
			let querySql = `
                SELECT t.id,t.header,t.nick_name,t.gender,t.age,t.marry,t.xueli,t.dist FROM (
                    SELECT *, TIMESTAMPDIFF(MINUTE ,login_time,NOW()) AS timestampdif,ABS(Distance - ${currentUser[0].Distance}) AS dist 
                    FROM dt_users 
                    ${innerwhere}  
                ) AS t
                WHERE t.timestampdif <= ${diffMinute} AND t.dist <= ${disnum} 
            `;

			// 4.0 执行查询操作
			let recomList = await ctx.executeSql(querySql);

			// 5.0 补上 缘分值 fateValue 和年龄差 agediff两个响应字段
			let maxfeatvalue = 0;
			let maxId = 0;
			if (recomList && recomList.length > 0) {
				let newList = recomList.map((user: any) => {
					let featvalue = getfateValue(user, currentUser[0]);
					if (featvalue > maxfeatvalue) {
						maxfeatvalue = featvalue;
						maxId = user.id;
					}
					return {
						...user,
						header: user.header,
						agediff: user.age - currentUser[0].age,
						fateValue: featvalue,
					};
				});

				// 6.0 找到缘分值最大的用户
				newList = newList.filter((item: any) => item.id == maxId);

				return ctx.send(newList);
			} else {
				return ctx.sendError(config.resCodes.customerError, "没有符合数据");
			}
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 推荐朋友
	/** 最终的sql语句:
     * SELECT t.id,t.header,t.nick_name,t.gender,t.age,t.marry,t.xueli,t.dist  FROM (
            SELECT *, TIMESTAMPDIFF(MINUTE ,login_time,NOW()) AS timestampdif,ABS(Distance - 13988957.3000) AS dist FROM dt_users 
            WHERE gender = '女' 
            AND age>=17 AND age <=25 AND address LIKE '%天河区%' AND xueli = '大专' AND status = 0
        ) AS t
        WHERE t.timestampdif < 60000 AND t.dist <= 1000 * 100
    */
	static async recommendation(ctx: any) {
		let query = ctx.request.query;
		try {
			// 1.0 获取当前登录用户信息（根据ctx.request.query）
			let currentUser = await ctx.executeSql(`select * from dt_users where mobile='${ctx.state.user.name}'`);

			// 2.0 条件组合
			let innerwhere = " WHERE status = 0 ";

			if (query.gender) {
				innerwhere += ` and gender = '${query.gender}'`;
			}
			if (query.education) {
				// innerwhere += ` and xueli = '${query.education}'`;
			}
			if (query.city) {
				// innerwhere += ` and address like '%${query.city}%'`;
			}

			if (currentUser && currentUser.length > 0 && currentUser[0].age > 0) {
				let minAge = currentUser[0].age - 5; // 当前登录用户的年龄减去5岁
				let maxAge = currentUser[0].age + 5;
				innerwhere += ` and age >= ${minAge} and age <= ${maxAge} `;
			}

			// 3.0 查询sql语句
			let diffMinute = 1440 * 365; // 默认是1年
			if (query.lastLogin == "15分钟") {
				diffMinute = 15;
			}
			if (query.lastLogin == "1小时") {
				diffMinute = 60;
			}
			if (query.lastLogin == "1天") {
				diffMinute = 1440;
			}

			let disnum = 1000 * 100; //默认是100KM范围
			if (query.distance) {
				disnum = query.distance;
			}

			// 分页数据
			let queryCount = `
                SELECT count(1) as count FROM (
                    SELECT *, TIMESTAMPDIFF(MINUTE ,login_time,NOW()) AS timestampdif,ABS(Distance - ${currentUser[0].Distance}) AS dist FROM dt_users 
                    ${innerwhere} -- 查询条件 WHERE
                ) AS t
                WHERE t.timestampdif <= ${diffMinute} AND t.dist <= ${disnum} 
            `;

			//  获取总条数
			let counts = await ctx.executeSql(queryCount);
			counts = counts[0].count;

			let page = query.page;
			let pagesize = query.pagesize;
			let pages = Math.ceil(counts / pagesize);
			let startIndex = (page - 1) * pagesize;

			// 查询的推荐数据
			let recomList;
			if (counts <= 0) {
				// 没有推荐的数据
				let queryCountAll = `
                    SELECT count(1) as count FROM (
                        SELECT *, TIMESTAMPDIFF(MINUTE ,login_time,NOW()) AS timestampdif,ABS(Distance - ${currentUser[0].Distance}) AS dist FROM dt_users 
                        WHERE status = 0
                    ) AS t
                `;
				counts = await ctx.executeSql(queryCountAll);
				counts = counts[0].count;

				page = query.page;
				pagesize = query.pagesize;
				pages = Math.ceil(counts / pagesize);
				startIndex = (page - 1) * pagesize;

				let querySqlAll = `
                    SELECT 
                        t.id,t.header,t.nick_name,t.gender,t.age,t.marry,t.xueli,t.dist 
                    FROM (
                        SELECT 
                            *, TIMESTAMPDIFF(MINUTE ,login_time,NOW()) AS timestampdif,ABS(Distance - ${currentUser[0].Distance}) AS dist 
                        FROM dt_users
                        WHERE status = 0
                    ) AS t                 
                    LIMIT ${startIndex}, ${pagesize}
                `;
				recomList = await ctx.executeSql(querySqlAll);
			} else {
				let querySql = `
                    SELECT 
                        t.id,t.header,t.nick_name,t.gender,t.age,t.marry,t.xueli,t.dist 
                    FROM (
                        SELECT *, TIMESTAMPDIFF(MINUTE ,login_time,NOW()) AS timestampdif,ABS(Distance - ${currentUser[0].Distance}) AS dist 
                        FROM dt_users 
                        ${innerwhere}
                    ) AS t
                    LIMIT ${startIndex}, ${pagesize}
                `;
				//  WHERE t.timestampdif <= ${diffMinute}  AND t.dist <= ${disnum}
				// 4.0 执行查询操作
				recomList = await ctx.executeSql(querySql);
			}

			// 5.0 补上 缘分值 fateValue 和年龄差 agediff两个响应字段
			if (recomList && recomList.length > 0) {
				let newList = recomList.map((user: any) => {
					return {
						...user,
						header: user.header,
						agediff: user.age - currentUser[0].age,
						fateValue: getfateValue(user, currentUser[0]),
					};
				});

				return ctx.send(newList, undefined, { counts, pagesize, pages, page });
			} else {
				return ctx.sendError(config.resCodes.customerError, "没有符合数据");
			}
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	/**
     * ? 朋友信息（表dt_users、dt_trends、dt_album；页面分三块：轮播图、个人信息、个人动态）
     * SQL1; 查询 当前用户或目标用户的信息
        select * from dt_users where id = 7 or id = 75;
     * SQL2; 获取 目标用户的动态数量
        select count(1) as count from dt_trends where uid = 75;
     * SQL3; 获取 分页获取个人动态
        select * from dt_trends where uid = 75  ORDER BY tid DESC LIMIT 0,5;
     * SQL4; 
        select aid,tid,thum_img_path,org_img_path from dt_album where uid = ${uid} and tid in (2,1,3,3);
        select aid,tid,uid, thum_img_path,org_img_path from dt_album where uid = ${uid} and ishead = 1 LIMIT 0,5
     * SQL5;
        INSERT INTO dt_visits(uid, target_uid,vistitCount, firstTime, lastTime) VALUES(${currentUserID},${uid},1,NOW(),NOW())
     */
	static async personalInfo(ctx: any) {
		try {
			let uid = ctx.params.id; // 目标用户
			let query = ctx.request.query;
			let currentUserID = ctx.state.user.id; // 登录用户

			// 1.0 获取当前登录用户和目标用户信息
			let users = await ctx.executeSql(`select * from dt_users where id = ${currentUserID} or id = ${uid}`);

			let currentUser = users.filter((item: any) => item.id == currentUserID);
			currentUser = currentUser && currentUser.length > 0 ? currentUser[0] : null;
			let targetUser = users.filter((item: any) => item.id == uid);
			targetUser = targetUser && targetUser.length > 0 ? targetUser[0] : null;

			if (!currentUser || !targetUser) {
				return ctx.sendError(config.resCodes.customerError, "用户信息获取失败,参数错误");
			}

			// 2.0 组装目标信息对象
			let targent_User: any = {
				id: targetUser.id,
				guid: targetUser.guid,
				mobile: targetUser.mobile,
				header: targetUser.header,
				nick_name: targetUser.nick_name,
				gender: targetUser.gender,
				age: targetUser.age,
				marry: targetUser.marry,
				xueli: targetUser.xueli,
				dist: Math.abs(currentUser.Distance - targetUser.Distance),
				agediff: currentUser.age - targetUser.age,
				fateValue: getfateValue(targetUser, currentUser),
			};

			// 3.0 分页获取个人动态
			let queryCount = `select count(1) as count from dt_trends where uid = ${uid}`;
			let counts = await ctx.executeSql(queryCount);
			counts = counts[0].count;
			let page = query.page;
			let pagesize = query.pagesize;
			let pages = Math.ceil(counts / pagesize);
			let startIndex = (page - 1) * pagesize;

			let msgSql = `select * from dt_trends where uid = ${uid}  ORDER BY tid DESC LIMIT ${startIndex},${pagesize}`;
			let messages = await ctx.executeSql(msgSql);

			// 4.0 给messages对象中加上每一条动态的相册照片
			if (!messages || messages.length <= 0) {
				targent_User.trends = [
					{
						tid: 3,
						uid: 7,
						content:
							"老婆给当程序员的老公打电话：“下班顺路买一斤包子带回来，如果看到卖西瓜的，买一个。”当晚，程序员老公手捧一个包子进了家门。老婆怒道：“你怎么就买了一个包子？！”老公答曰：“因为看到了卖西瓜的。”",
						star_count: 0,
						comment_count: 0,
						like_count: 0,
						status: 0,
						create_time: "2019-11-11T07:19:12.000Z",
						lng: null,
						lat: null,
						address: null,
						album: [
							{
								aid: 6,
								tid: 3,
								thum_img_path: "/upload/album/1_7_1.jpg",
								org_img_path: "/upload/album/1_7_1.jpg",
							},
						],
					},
				];

				targent_User.silder = [
					{
						aid: 1,
						tid: 1,
						uid: 7,
						thum_img_path: "/upload/album/1_7_1.jpg",
						org_img_path: "/upload/album/1_7_1.jpg",
					},
					{
						aid: 2,
						tid: 1,
						uid: 7,
						thum_img_path: "/upload/album/1_7_2.jpg",
						org_img_path: "/upload/album/1_7_2.jpg",
					},
				];

				// return ctx.sendError(config.resCodes.customerError, '无数据');
			} else {
				let ids = messages.map((item: any) => item.tid);
				let albums = await ctx.executeSql(`
                    select aid,tid,thum_img_path,org_img_path from dt_album where uid = ${uid} and tid in (${ids.join(",")}) -- '2,1,3,3'
                `);
				targent_User.trends = messages.map((item: any) => {
					return {
						...item,
						album: albums.filter((a: any) => a.tid == item.tid), // 给messages对象中加上每一条动态的相册照片
					};
				});

				// 5.0 朋友轮播图头像 ishead = 1 表示筛选出该用户的相册中的头像
				let silder = await ctx.executeSql(`
                    select aid,tid,uid, thum_img_path,org_img_path from dt_album where uid = ${uid} and ishead = 1 LIMIT 0,5
                `);
				targent_User.silder = silder;
			}

			// 6.0 增加用户到目标用户的最近访问列表中
			let visitsql = `INSERT INTO dt_visits(uid, target_uid,vistitCount, firstTime, lastTime) VALUES(${currentUserID},${uid},1,NOW(),NOW())`;
			let visitsqlRes = await ctx.executeSql(visitsql);
			console.log("最近访问人表插入 ==========", visitsqlRes);

			return ctx.send(targent_User, undefined, { counts, pagesize, pages, page });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	/**
     * ? 通过 guid 查找用户信息; 表dt_users
     * SQL；
        select * from dt_users where  guid in (186657111221592819120579,186657222221592820013434,186657444441592901674548);
     */
	static async personalInfoByGuid(ctx: any) {
		try {
			let guids = ctx.params.id; // 目标用户

			// 1.0 获取当前登录用户和目标用户信息
			let users = await ctx.executeSql(`select * from dt_users where  guid in (${guids})`);

			return ctx.send(users, undefined, {});
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	/**
     * ? 搜附近的人：按照距离由近到远返回前10条数据
     * SQL; 查询距离从近到远的10条数据
        SELECT t.id,t.header,t.nick_name,t.dist  FROM (
            SELECT *, ABS(Distance - 0) AS dist FROM dt_users WHERE gender = '女' AND status = 0
        ) AS t
        WHERE t.dist <= 10000
        ORDER BY t.dist ASC
        LIMIT 0,10;
     */
	static async search(ctx: any) {
		try {
			let query = ctx.request.query;
			let gender = "";
			if (query.gender) {
				gender += " gender ='" + query.gender + "' AND ";
			}
			let sql = `
                SELECT t.id as uid, t.header,t.nick_name,t.dist  FROM (
                    SELECT *, ABS(Distance - 0) AS dist FROM dt_users WHERE ${gender} status = 0
                ) AS t
                WHERE t.dist <= ${query.distance}
                ORDER BY t.dist ASC
                LIMIT 0, 10
            `;
			let users = await ctx.executeSql(sql);
			return ctx.send(users);
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	/**
     * ? 探花左滑右滑卡片分页数据（喜欢或不喜欢对方） 
     * SQL1; 根据性别查询所有用户数量
        select count(1) as count from dt_users where status = 0 and gender = '男';
        select count(1) as count from dt_users where status = 0 and gender = '女';
     * SQL2; 分页查询性别女的所有用户列表
        select t.id, t.header,t.nick_name,t.age,t.gender,t.marry,t.xueli,t.dist from (
            select *,ABS(Distance - 0) AS dist from dt_users where status = 0 and gender = '女'
        ) as t 
        order by t.dist asc
        limit 0, 5;
     */
	static async cards(ctx: any) {
		try {
			let query = ctx.request.query;
			let currentUserID = ctx.state.user.id; // 登录用户

			// 1.0 获取当前登录用户和目标用户信息
			let currentUser = await ctx.executeSql(`select * from dt_users where id = ${currentUserID}`);
			if (!currentUser || currentUser.length <= 0) {
				return ctx.sendError(config.resCodes.customerError, "token数据异常");
			}
			let gender = currentUser[0].gender;
			gender = gender == "女" ? "男" : "女";

			let queryCount = `select count(1) as count from dt_users where status = 0 and gender = '${gender}'`;
			let counts = await ctx.executeSql(queryCount);
			counts = counts[0].count;
			let page = query.page;
			let pagesize = query.pagesize;
			let pages = Math.ceil(counts / pagesize);
			let startIndex = (page - 1) * pagesize;

			let sql = `
                SELECT t.id, t.header ,t.nick_name,t.age,t.gender,t.marry,t.xueli,t.dist FROM (
                    SELECT *,ABS(Distance - 0) AS dist FROM dt_users 
                    WHERE gender = '女' AND status = 0
                ) AS t
                ORDER BY t.dist ASC
                LIMIT ${startIndex},${pagesize}
            `;
			let users = await ctx.executeSql(sql);
			return ctx.send(users, undefined, { counts, page, pagesize, pages });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	/**
     * ? 探花喜欢（表dt_like；喜欢对方，不再喜欢对方）
     * SQL1; 一叶知秋7 喜欢 草莓味冰淇淋75
        SELECT count(1) as count FROM dt_like WHERE uid = 7 AND like_uid = 75 AND type = 'like';
        SQL2 喜欢对方
        `INSERT INTO dt_like (uid,like_uid,tid,type,create_time) VALUES (${currentUserID},${likeuid},NULL,'like',NOW());`
        SQL3 不喜欢对方
        `delete FROM dt_like WHERE uid = ${currentUserID} AND like_uid = ${likeuid} and type = 'like'`
     */
	static async like(ctx: any) {
		try {
			let likeuid = ctx.params.id; // 目标用户id
			let type = ctx.params.type; //操作类型  like和dislike
			let currentUserID = ctx.state.user.id; // 登录用户

			let checkSql = `SELECT count(1) as count FROM dt_like WHERE uid = ${currentUserID}  AND like_uid = ${likeuid} AND type = '${type}'`;
			let counts = await ctx.executeSql(checkSql);
			let count = counts[0].count;
			if (count > 0) {
				return ctx.send("已喜欢");
			}
			if (type == "like") {
				let sql = `INSERT INTO dt_like (uid,like_uid,tid,type,create_time) VALUES (${currentUserID},${likeuid},NULL,'like',NOW());`;
				await ctx.executeSql(sql);
				return ctx.send("喜欢成功");
			} else {
				// 不喜欢
				let sql = `delete FROM dt_like WHERE uid = ${currentUserID} AND like_uid = ${likeuid} and type = 'like'`;
				await ctx.executeSql(sql);
				return ctx.send("不再喜欢");
			}
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	/**
	 * ? 测灵魂卷列表（表dt_questions、dt_question_user_ans；查询测试题数据，查询用户的测试题答案并处理）
	 * SQL1；查询测试题数据
	 * SELECT *, imgpath FROM dt_questions WHERE status = 0 ORDER by sort_no ASC;
	 * SQL1；查询用户7的测试题答案
	 * select * from dt_question_user_ans where uid = 7;
	 * select * from dt_question_user_ans where uid = 8;
	 */
	static async questions(ctx: any) {
		try {
			let currentUserID = ctx.state.user.id; // 登录用户

			let data = await ctx.executeSql(`SELECT *, imgpath FROM dt_questions WHERE status = 0 ORDER by sort_no ASC`);
			if (!data || data.length <= 0) {
				return ctx.sendError(config.resCodes.customerError, "无数据");
			}

			let tested = await ctx.executeSql(`select * from dt_question_user_ans where uid = ${currentUserID}`);

			let islockdata: any = [];
			let istesteddata: any = [];

			let newdata = data.map((item: any, index: number) => {
				let istested = tested.filter((t: any) => t.qid == item.qid).length > 0;
				istesteddata.push(istested);

				if (index == 0) {
					islockdata[index] = false;
				} else {
					if (islockdata[index - 1] == false && istesteddata[index - 1] == true) {
						islockdata[index] = false;
					} else {
						islockdata[index] = true;
					}
				}

				return {
					...item,
					istested: istested,
					islock: islockdata[index],
				};
			});
			return ctx.send(newdata);
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 测灵魂题卷题目
	static async questionSection(ctx: any) {
		try {
			let currentUserID = ctx.state.user.id; // 登录用户
			let qid = ctx.params.id; // 问卷id

			let data = await ctx.executeSql(`SELECT qsid, question_title FROM dt_question_section WHERE qid = ${qid} order by sortid asc`);
			if (!data || data.length <= 0) {
				return ctx.sendError(config.resCodes.customerError, "无问卷数据");
			}

			let ansdata = await ctx.executeSql(`select qsid,ans_title,ans_No from dt_questions_section_ans where qid = ${qid}`);
			if (!ansdata || ansdata.length <= 0) {
				return ctx.sendError(config.resCodes.customerError, "无答案数据");
			}

			let newdata = data.map((item: any) => {
				return {
					...item,
					answers: ansdata
						.filter((t: any) => t.qsid == item.qsid)
						.sort((p: any, n: any) => {
							return p.ans_No.charCodeAt() - n.ans_No.charCodeAt();
						}),
				};
			});

			return ctx.send(newdata);
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 提交测试结果获得鉴定单信息
	static async questionsAns(ctx: any) {
		try {
			let currentUserID = ctx.state.user.id; // 登录用户
			let qid = ctx.params.id; // 问卷id
			let body = ctx.request.body;
			// 1.0 获取当前登录用户信息
			let currentUser = await ctx.executeSql(`select * from dt_users where id = ${currentUserID}`);

			let question = await ctx.executeSql(`SELECT * FROM dt_questions where qid = ${qid}`);

			// 获取当前问卷的所有鉴定单数据
			let data = await ctx.executeSql(`SELECT * FROM dt_question_result where qid = ${qid}`);
			let datalng = 0;

			if (!data || data.length <= 0) {
				return ctx.sendError(config.resCodes.customerError, "无鉴定单数据");
			}

			datalng = data.length;
			// 随机从data 数组中取得一个坚定单结果数据
			let random = randomNum(0, datalng - 1);
			let question_result = data[random];
			// 设定当前用户
			question_result.currentUser = currentUser[0];
			delete question_result.question_ans;

			// 向dt_question_user_ans表中插入一条测试结果数据
			if (!body || !body.answers || body.answers.length <= 0) {
				return ctx.sendError(config.resCodes.customerError, "问卷测试答案不能为空");
			}

			let extis_result = await ctx.executeSql(`SELECT * FROM dt_question_user_ans where qid = ${qid} and uid=${currentUserID}`);
			if (extis_result && extis_result.length > 0) {
				// 更新
				await ctx.executeSql(`update dt_question_user_ans set
                ans_str = '${body.answers}',qrid=${question_result.qrid}
                where qid = ${qid} and uid=${currentUserID}
                `);
			} else {
				await ctx.executeSql(`
                    INSERT INTO dt_question_user_ans
                        (
                            uid
                            ,qid
                            ,ans_str
                            ,qrid
                            ,title
                        )
                    VALUES
                        (
                            ${currentUserID} 
                            ,${qid}
                            ,'${body.answers}'
                            ,${question_result.qrid} 
                            ,'${question && question.length > 0 ? question[0].type + "测试结果鉴定单" : "测试结果鉴定单"}'
                        );
                    `);
			}

			delete question_result.qrid;
			return ctx.send(question_result);
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}
}

// 生成从minNum到maxNum的随机数,包括minNum和maxNum
function randomNum(minNum: number, maxNum: number) {
	switch (arguments.length) {
		case 1:
			return parseInt(String(Math.random() * minNum + 1), 10);
		case 2:
			return parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10);
		default:
			return 0;
	}
}

// ? 计算缘分值
/**
 * 算法如下：
 * 取两个用户的，如下维度进行计算：
 * 1、年龄每相差1岁，减掉得10分，最终计算占比：30%
 * 2、结婚状态，不同则按照如下方式计算： 最终计算占比：10%
 *      30分情况：1、一个未婚，一个已婚
 *      60分情况：1、一个未婚，一个离婚
 *      100分情况：两人状态均一样
 * 3、距离相差，占比20%
 *      相差 2KM以内：100分
 *      相差 2KM - 10KM以内：60分
 *      相差 10KM - 20KM以内：40分
 *      相差 20KM - 100KM：20分
 *      相差 100KM以上：0分
 *
 * 4、学历,占比20%
 *     每相差一个梯度减去10分
 *
 * 5、其他占比20%
 *     灵魂测试后结果
 *
 * 6、如果性别一样，缘分值按照结果的0.5计算
 *
 * @param {*} user  : 推荐用户
 * @param {*} currentUser ：当前登录用户
 */
function getfateValue(user: any, currentUser: any) {
	// 1 ageNum
	let ageNum = 100 - Math.abs(currentUser.age - user.age) * 10;

	// 2 marrayNum
	let marrayNum = 0;
	if (currentUser.marry == "未婚" && user.marry == "已婚") {
		marrayNum = 30;
	}
	if (currentUser.marry == "未婚" && user.marry == "离婚") {
		marrayNum = 60;
	}
	if (currentUser.marry == user.marry) {
		marrayNum = 100;
	}

	// 3 distNum
	let distNum = 0;
	let disValue = Math.abs(currentUser.Distance - user.Distance);
	// console.log(currentUser.Distance, user.Distance)
	if (disValue <= 1000 * 100) {
		distNum = 20;
	}

	if (disValue <= 1000 * 20) {
		distNum = 40;
	}

	if (disValue <= 1000 * 10) {
		distNum = 60;
	}

	if (disValue <= 1000 * 2) {
		distNum = 100;
	}

	// 4 学历 xlNum
	let xlobj: any = {
		博士后: 1,
		博士: 2,
		硕士: 3,
		本科: 4,
		留学: 4,
		大专: 5,
		高中: 6,
		其他: 6,
	};

	let curxlvalue = xlobj[currentUser.xueli] ? xlobj[currentUser.xueli] : 6;
	let userxlvalue = xlobj[user.xueli] ? xlobj[user.xueli] : 6;
	let xlNum = 100 - Math.abs(curxlvalue - userxlvalue) * 10;

	// 5 othernum
	let othernum = 100;

	// 计算结果
	// console.log(`${ageNum} * 0.3 + ${marrayNum} * 0.1 + ${distNum} * 0.2 + ${xlNum} * 0.2 + ${othernum} * 0.2`)
	let resNum = ageNum * 0.3 + marrayNum * 0.1 + distNum * 0.2 + xlNum * 0.2 + othernum * 0.2;

	// 6、如果性别一样，缘分值按照结果的0.5计算
	if (currentUser.gender == user.gender) {
		resNum = resNum * 0.5;
	}

	return resNum;
}

export default FriendsController;
