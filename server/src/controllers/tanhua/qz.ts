import { config } from "../../config/config";
import fs from "fs";
import path from "path";

class qzController {
	// 推荐信息,如果有dt_like中有不喜欢的数据则不显示
	static async recommend(ctx: any) {
		/**
         *    select u.*,t.tid,t.content,t.star_count,t.comment_count,t.like_count from (
            SELECT t.id as uid,CONCAT('${global.domain}',t.header) AS header,t.nick_name,t.gender,t.age,t.xueli,
            t.marry,t.dist 
            FROM (
                    SELECT *,ABS(Distance - 0) AS dist FROM dt_users u
                    WHERE u.status = 0 AND NOT EXISTS(select 1 from dt_like k where k.uid = u.id AND k.type='dislike')
                    ) AS t
            ) as u
            inner join dt_trends t on (u.uid=t.uid and t.status =0)
            order by u.dist
            limit 0,10
        * 
        */
		try {
			let query = ctx.request.query;
			let currentUserID = ctx.state.user.id; // 登录用户
			// 1.0 获取当前登录用户信息
			let currentUser = await ctx.executeSql(`select age,Distance from dt_users where id = ${currentUserID}`);
			if (!currentUser) {
				return ctx.sendError(config.resCodes.customerError, "用户信息获取失败,参数错误");
			}
			let currentUserDistance = currentUser[0].Distance;

			// 2.0 获取符合条件的数据总条数
			let queryCount = `
            select count(1) as count from (
                SELECT t.id as uid, t.header,t.nick_name,t.gender,t.age,t.xueli,t.marry,t.dist 
                FROM (
                    SELECT *,ABS(Distance - ${currentUserDistance}) AS dist FROM dt_users u
                    WHERE u.status = 0 AND NOT EXISTS(select 1 from dt_like k where k.uid = u.id AND k.type='dislike')
                    ) AS t
                ) as u
                inner join dt_trends t on (u.uid=t.uid and t.status =0)
            `;

			let counts = await ctx.executeSql(queryCount);
			counts = counts[0].count;
			let page = query.page;
			let pagesize = query.pagesize;
			let pages = Math.ceil(counts / pagesize);
			let startIndex = (page - 1) * pagesize;

			// 3.0 分页获取数据
			let sql = `
                select u.*,t.tid,t.content,t.star_count,t.comment_count,t.like_count,t.create_time from (
                    SELECT t.id as uid, t.mobile,t.header ,t.nick_name,t.gender,t.age,t.guid,t.xueli,t.marry,t.dist 
                    FROM (
                        SELECT *,ABS(Distance - ${currentUserDistance}) AS dist FROM dt_users u
                        WHERE u.status = 0 AND NOT EXISTS(select 1 from dt_like k where k.uid = u.id AND k.type='dislike')
                        ) AS t
                    ) as u
                inner join dt_trends t on (u.uid=t.uid and t.status =0)
                order by u.dist 
                limit ${startIndex}, ${pagesize}
            `;
			let trends = await ctx.executeSql(sql);
			if (!trends || trends.length <= 0) {
				return ctx.sendError(config.resCodes.customerError, "无数据");
			}

			// 4.0 补上每一条动态的相册图片
			let tids = trends.map((item: any) => item.tid).join(",");
			// console.log(tids);
			let albums = await ctx.executeSql(`select tid,  thum_img_path, org_img_path from dt_album where tid in (${tids})`);

			let newtrends = trends.map((item: any) => {
				return {
					...item,
					agediff: item.age - currentUser[0].age,
					images: albums.filter((a: any) => a.tid == item.tid),
				};
			});

			// 5.0 响应
			return ctx.send(newtrends, undefined, { counts, pagesize, pages, page });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 最新动态SQL
	static async newtrends(ctx: any) {
		/** 最新动态SQL:
         * select u.id as uid,CONCAT('${global.domain}',u.header) AS header,u.nick_name,u.gender,u.age,u.xueli,u.marry,
            t.tid,t.content,t.star_count,t.comment_count,t.like_count,t.create_time from dt_trends t 
            inner join dt_users u on (u.id=t.uid and t.status = 0 
            AND NOT EXISTS(select 1 from dt_like k where k.uid = u.id AND k.type='dislike'))
            order by t.create_time DESC
        *
        */
		try {
			let query = ctx.request.query;
			let currentUserID = ctx.state.user.id; // 登录用户

			// 1.0 获取当前登录用户信息
			let currentUser = await ctx.executeSql(`select age,Distance from dt_users where id = ${currentUserID}`);
			if (!currentUser) {
				return ctx.sendError(config.resCodes.customerError, "用户信息获取失败,参数错误");
			}
			let currentUserDistance = currentUser[0].Distance;

			// 2.0 获取符合条件的数据总条数
			let queryCount = `
                select 
                    count(1) as count 
                from 
                    dt_trends t 
                inner join 
                    dt_users u on (u.id=t.uid and t.status = 0 AND NOT EXISTS(select 1 from dt_like k where k.uid = u.id AND k.type='dislike'))
                order by 
                    t.create_time DESC
            `;

			let counts = await ctx.executeSql(queryCount);
			counts = counts[0].count;
			let page = query.page;
			let pagesize = query.pagesize;
			let pages = Math.ceil(counts / pagesize);
			let startIndex = (page - 1) * pagesize;

			// 3.0 分页获取数据
			// let sql = `
			//     select u.id as uid, u.header,u.nick_name,u.gender,u.age,u.xueli,u.marry,
			//     t.tid,t.content,t.star_count,t.comment_count,t.like_count,t.create_time from dt_trends t
			//     inner join dt_users u on (u.id=t.uid and t.status = 0
			//     AND NOT EXISTS(select 1 from dt_like k where k.uid = u.id AND k.type='dislike'))
			//     order by t.create_time DESC
			//     limit ${startIndex},${pagesize}
			//  `;

			let sql = `
                select 
                    u.*,t.tid,t.content,t.star_count,t.comment_count,t.like_count,t.create_time 
                from (
                    SELECT 
                        t.id as uid,t.mobile, t.header ,t.nick_name,t.gender,t.age, t.xueli,t.marry,t.dist 
                    FROM (
                        SELECT *,ABS(Distance - ${currentUserDistance}) AS dist FROM dt_users u
                        WHERE u.status = 0 AND NOT EXISTS(select 1 from dt_like k where k.uid = u.id AND k.type='dislike')
                    ) AS t
                ) as u
                inner join dt_trends t on (u.uid=t.uid and t.status =0)
                order by t.create_time DESC
                limit ${startIndex},${pagesize}
            `;

			let trends = await ctx.executeSql(sql);
			if (!trends || trends.length <= 0) {
				return ctx.sendError(config.resCodes.customerError, "无数据");
			}

			// 4.0 补上每一条动态的相册图片
			let tids = trends.map((item: any) => item.tid).join(",");
			// console.log(tids);
			let albums = await ctx.executeSql(`select tid,  thum_img_path, org_img_path  from dt_album where tid in (${tids})`);

			let newtrends = trends.map((item: any) => {
				return {
					...item,
					images: albums.filter((a: any) => a.tid == item.tid),
				};
			});

			// 5.0 响应
			return ctx.send(newtrends, undefined, { counts, pagesize, pages, page });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 动态点赞
	static async star(ctx: any) {
		try {
			let params = ctx.params;
			let currentUserID = ctx.state.user.id; // 登录用户

			let res = await ctx.executeSql(`
                select uid,star_count from dt_trends where tid = ${params.id}
            `);
			if (!res || res.length <= 0) {
				return ctx.sendError(config.resCodes.customerError, "动态id错误");
			}

			let stardata = await ctx.executeSql(`
                select * from dt_star where star_uid=${currentUserID} and tid=${params.id}
            `);

			if (stardata && stardata.length > 0) {
				// 取消点赞
				await ctx.executeSql(`delete from dt_star where star_uid=${currentUserID} and tid=${params.id} `);
				await ctx.executeSql(`update dt_trends set star_count =star_count - 1 where tid = ${params.id}`);
				return ctx.send({ start_count: res[0].star_count - 1, iscancelstar: true });
			}

			// 点赞
			let sql = `update dt_trends set star_count =star_count + 1 where tid = ${params.id};`;
			await ctx.executeSql(sql);

			await ctx.executeSql(`
                INSERT INTO dt_star
                (uid,star_uid,tid,create_time)
                VALUES
                (${res[0].uid},${currentUserID},${params.id},NOW());
            `);

			let start_count = res && res.length > 0 ? res[0].star_count + 1 : 0;

			return ctx.send({ start_count, iscancelstar: false });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 动态喜欢，取消喜欢
	static async like(ctx: any) {
		try {
			let params = ctx.params;
			let currentUserID = ctx.state.user.id; // 登录用户

			let res = await ctx.executeSql(`select uid,star_count from dt_trends where tid = ${params.id}`);
			if (!res || res.length <= 0) {
				return ctx.sendError(config.resCodes.customerError, "动态id错误");
			}

			let stardata = await ctx.executeSql(`
                select * from dt_like where like_uid=${res[0].uid} and tid=${params.id} and type = 'like'
            `);

			if (stardata && stardata.length > 0) {
				// 取消喜欢
				await ctx.executeSql(`delete from dt_like where like_uid=${res[0].uid} and tid=${params.id} and type = 'like' `);
				await ctx.executeSql(`update dt_trends set like_count =like_count - 1 where tid = ${params.id}`);
				return ctx.send({ like_count: res[0].like_count - 1, iscancelstar: true });
			}

			// 喜欢
			let sql = `update dt_trends set like_count =like_count + 1 where tid = ${params.id};`;
			await ctx.executeSql(sql);

			await ctx.executeSql(`
                INSERT INTO dt_like
                (uid,like_uid,tid,type,create_time)
                VALUES
                (${currentUserID},${res[0].uid},${params.id},'like',NOW());
            `);

			let like_count = res && res.length > 0 ? res[0].star_count + 1 : 0;

			return ctx.send({ like_count, iscancelstar: false });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// noInterest
	static async noInterest(ctx: any) {
		try {
			let params = ctx.params;
			let currentUserID = ctx.state.user.id; // 登录用户

			let res = await ctx.executeSql(`select uid from dt_trends where tid = ${params.id}`);
			if (!res || res.length <= 0) {
				return ctx.sendError(config.resCodes.customerError, "动态id错误");
			}

			let res1 = await ctx.executeSql(`
                select uid from dt_like where tid = ${params.id} and like_uid=${currentUserID} and uid=${res[0].uid} and type='dislike'
            `);
			if (res1 && res1.length > 0) {
				return ctx.sendError(config.resCodes.customerError, "请勿重复点击");
			}

			await ctx.executeSql(`
                INSERT INTO dt_like
                (
                uid
                ,like_uid
                ,tid
                ,type
                ,create_time
                )
                VALUES
                ( 
                ${res[0].uid}
                ,${currentUserID}
                ,${params.id}
                ,'dislike'
                ,NOW()
                );
            `);

			return ctx.send({ uid: res[0].uid });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 评论分页数据
	static async comments(ctx: any) {
		/**
         *  SELECT * FROM dt_comments dc WHERE dc.tid = 7 and dc.parent_cid = 0 ORDER BY dc.create_time DESC
            LIMIT 0,10
        */
		try {
			let query = ctx.request.query;
			let params = ctx.params;
			let currentUserID = ctx.state.user.id; // 登录用户

			// 获取符合条件的数据总条数
			let queryCount = `
                SELECT count(1) as count FROM dt_comments dc WHERE dc.tid = ${params.id} and dc.parent_cid = 0
            `;
			let counts = await ctx.executeSql(queryCount);
			counts = counts[0].count;
			let page = query.page;
			let pagesize = query.pagesize;
			let pages = Math.ceil(counts / pagesize);
			let startIndex = (page - 1) * pagesize;

			// 分页获取数据
			let data = await ctx.executeSql(`
                SELECT 
                    dc.*,du.header, du.nick_name 
                FROM 
                    dt_comments dc 
                inner join 
                    dt_users du on(dc.uid = du.id)
                WHERE dc.tid = ${params.id} and dc.parent_cid = 0 
                ORDER BY dc.create_time DESC
                LIMIT ${startIndex},${pagesize}
            `);

			// 5.0 响应
			return ctx.send(data, undefined, { counts, pagesize, pages, page });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 朋友圈评论点赞
	static async commentsstar(ctx: any) {
		try {
			let cid = ctx.params.id; // 评论数据id
			let currentUserID = ctx.state.user.id; // 登录用户

			await ctx.executeSql(`
             update dt_comments set star= star+1 where cid= ${cid}
            `);

			let data = await ctx.executeSql(`
            select star as star_count from dt_comments where cid= ${cid}
            `);

			if (!data || data.length <= 0) {
				return ctx.sendError(config.resCodes.customerError, "评论数据异常");
			}

			// 5.0 响应
			return ctx.send({ star_count: data[0].star_count });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 提交评论
	static async commentssubmit(ctx: any) {
		try {
			let tid = ctx.params.id; // 动态id
			let body = ctx.request.body; // 有一个comment 属性表示评论数据
			let currentUserID = ctx.state.user.id; // 登录用户

			if (!body.comment) {
				return ctx.sendError(config.resCodes.customerError, "评论内容不能为空");
			}

			await ctx.executeSql(`
                INSERT INTO dt_comments
                (
                parent_cid
                ,tid
                ,uid
                ,content
                ,star
                ,create_time
                )
                VALUES
                (
                0 
                ,${tid} 
                ,${currentUserID}
                ,'${body.comment}'
                ,0 
                ,NOW()
                );
            `);

			// 点赞

			let sql = `
                update dt_trends set comment_count =comment_count + 1 where tid = ${tid};                      
            `;
			await ctx.executeSql(sql);

			// 5.0 响应
			return ctx.send("评论成功");
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 上传动态中的图片
	static async trendsimageupload(ctx: any) {
		try {
			let mobile = ctx.state.user.name;
			// console.log(ctx.request.files[''])
			const files = ctx.request.files["images"]; // 获取上传文件
			if (files.length <= 0 && !files.uri) {
				return ctx.sendError(config.resCodes.customerError, "至少要有一张图片");
			}

			// 判断用户手机号码文件夹是否存在,如果不存在创建一个
			let dirpath = path.join(__dirname, `../../public/upload/album/${mobile}/`);
			if (fs.existsSync(dirpath) == false) {
				fs.mkdirSync(dirpath, { recursive: true });
			}
			let datares = [];
			// console.log(JSON.stringify(files));
			if (!files.path) {
				// 当多张图片的情况
				//  遍历图片上传
				files.map((file: any) => {
					// 创建可读流
					const reader = fs.createReadStream(file.path);
					const extname = path.extname(file.name);
					let now = new Date();
					let filename = now.getTime().toString();
					let random = Math.random().toString();
					filename = filename + "_" + random;

					let filePath = path.join(__dirname, `../../public/upload/album/${mobile}/`) + `${filename + extname}`;
					// 创建可写流
					const upStream = fs.createWriteStream(filePath);
					// 可读流通过管道写入可写流
					reader.pipe(upStream);
					//reader.close();

					datares.push({
						headImgShortPath: `/upload/album/${mobile}/` + `${filename + extname}`,
						headImgPath: config.global + `/upload/album/${mobile}/` + `${filename + extname}`,
					});
				});
			} else if (files.path && files.name) {
				// 创建可读流
				const reader = fs.createReadStream(files.path);
				const extname = path.extname(files.name);
				let now = new Date();
				let filename = now.getTime().toString();
				let random = Math.random().toString();
				filename = filename + "_" + random;

				let filePath = path.join(__dirname, `../../public/upload/album/${mobile}/`) + `${filename + extname}`;
				// 创建可写流
				const upStream = fs.createWriteStream(filePath);
				// 可读流通过管道写入可写流
				reader.pipe(upStream);
				//reader.close();

				datares.push({
					headImgShortPath: `/upload/album/${mobile}/` + `${filename + extname}`,
					headImgPath: config.global + `/upload/album/${mobile}/` + `${filename + extname}`,
				});
			}

			// 响应
			return ctx.send(datares, "上传成功");
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 发布动态
	static async submittrend(ctx: any) {
		let trend: any = null;
		try {
			/*
                body中图片数据的格式：
                imageContent：[
                    {
                    "headImgShortPath": "/upload/album/13828459782/1575602512190_0.7148657889243111.png",
                    "headImgPath": "http://localhost:3000/upload/album/13828459782/1575602512190_0.7148657889243111.png"
                    },
                    {
                    "headImgShortPath": "/upload/album/13828459782/1575602512191_0.9815518035351052.png",
                    "headImgPath": "http://localhost:3000/upload/album/13828459782/1575602512191_0.9815518035351052.png"
                    }
                ]
            */
			let body = ctx.request.body;
			let currentUserID = ctx.state.user.id; // 登录用户

			let sql = `
                INSERT INTO dt_trends
                    (
                        uid
                        ,content
                        ,star_count
                        ,comment_count
                        ,like_count
                        ,status
                        ,create_time
                        ,lng
                        ,lat
                        ,address
                    )
                VALUES
                    (
                        ${currentUserID}
                        ,'${body.textContent}' 
                        ,0 
                        ,0
                        ,0 
                        ,0
                        ,NOW() 
                        ,${body.longitude}
                        ,${body.latitude}
                        ,'${body.location}'
                    )
            `;
			trend = await ctx.executeSql(sql);

			// 插入动态的图片数据
			let imageContent = body.imageContent;
			if (typeof imageContent == "string") {
				imageContent = JSON.parse(imageContent);
			}
			if (imageContent.length <= 0) {
				return;
			}

			/** 插入数据后返回的格式
            * OkPacket {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 6,
                serverStatus: 2,
                warningCount: 0,
                message: '',
                protocol41: true,
                changedRows: 0 }
           */
			imageContent.map(async (image: any) => {
				try {
					// 检查是否是人的头像照片
					let isPass = true;
					/*
                    let dirpath = path.join(__dirname, `../../public${image.headImgShortPath}`);
                    if (fs.existsSync(dirpath) == false) {
                        console.log(`路径${dirpath}不存在`);
                    } else {
                        let data = fs.readFileSync(dirpath);
                        let base64img = data.toString('base64');
                        // console.log(base64img)
                        let access_token = await getBaiDuAiAccessToken();
                        isPass = await checkImage(access_token, base64img, 'BASE64');
                    }
                    */
					let imgSql = `
                        INSERT INTO dt_album
                            (
                                tid
                                ,uid
                                ,type
                                ,thum_img_path
                                ,org_img_path
                                ,create_time
                                ,ishead
                            )
                        VALUES
                            (
                                ${trend.insertId}
                                ,${currentUserID} 
                                ,1 
                                ,'${image.headImgShortPath}'
                                ,'${image.headImgShortPath}'
                                ,NOW()
                                ,${isPass ? 1 : 0}
                            )
                        `;
					await ctx.executeSql(imgSql);
				} catch (alberr) {
					if (trend) {
						ctx.executeSql(`
                            delete from dt_trends where tid = ${trend.insertId}
                        `);

						ctx.executeSql(`
                            delete from dt_album where tid = ${trend.insertId}
                        `);
					}
					return ctx.sendError(config.resCodes.serverError, alberr.message);
				}
			});

			// 5.0 响应
			return ctx.send("发布动态成功");
		} catch (err) {
			if (trend) {
				ctx.executeSql(`
                    delete from dt_trends where tid = ${trend.insertId}
                `);

				ctx.executeSql(`
                    delete from dt_album where tid = ${trend.insertId}
                `);
			}
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}
}

export default qzController;
