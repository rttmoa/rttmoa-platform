import { config } from './config/config'


    
export default class SqlController {
    constructor() {
        // console.log(123); 
    }
    static async start (ctx: any) {
        try {
            let findSQL = `select status from dt_users where mobile = ${15303663375} `
            let resultData = await ctx.executeSql(findSQL)

            let updateSQL = ` update dt_users set vcode = ${88888},login_time=NOW() where mobile =${15303663375} `
            await ctx.executeSql(updateSQL)

            let insSQL = `insert into dt_users (mobile,vcode,status,login_time,guid) values (${15303663375},${88888},2,NOW(),${`${15303663375} ${13}`})`
            await ctx.executeSql(insSQL)
        } catch (error) {
            return ctx.sendError(config.resCodes.serverError, error.message)
        }
    }

    static async test1 (ctx: any) {
        let SQL = `
            select * from student LIMIT 0,10
        `
        let result = await ctx.executeSql(
            SQL
        ) 
        console.log(result.length);
        return ctx.send(result.length)
    }
    static async test2 (ctx: any) {
        let sql = `
            select min(score), avg(score),sum(score) from sc
        `
        let result = await ctx.executeSql(sql) 
        console.log(result);
        return ctx.send(result)
    }

    static async test3 (ctx: any) {
        try {
            let sql = `
                select count(*) from course 
                left join teacher using(tno) 
                where tname = "諶燕"
            `
            let sql2 = `
                select count(*) from course 
                left join teacher 
                on course.tno = teacher.tno
                where tname = "諶燕"
            `
            let result = await ctx.executeSql(sql2) 
            return ctx.send(result)
        } catch (error) { return ctx.sendError(10002, error.message) }
    }

    static async test4 (ctx: any) {
        try { 
            let sql = `
                select tname,count(*) count from course 
                left join teacher 
                on course.tno = teacher.tno 
                group by teacher.tno 
            `
            let result = await ctx.executeSql(sql) 
            // {"code":"10000","msg":"请求成功","data":[{"tname":"劉陽","count":3},{"tname":"胡明星","count":3},{"tname":"諶燕","count":4}]}
            return ctx.send(result)
        } catch (error) { return ctx.sendError(10002, error.message) }
    }

    static async test5 (ctx: any) {
        try { 
            let sql = `
                select sname from student
                where sname like "張%"
            `
            let result = await ctx.executeSql(sql)  
            return ctx.send(result)
        } catch (error) { return ctx.sendError(10002, error.message) }
    }

    static async test6 (ctx: any) {
        try { 
            let sql = `
                select sno,score from sc
                left join course
                on sc.cno = course.cno
                where cname = "Oracle" AND score < 60
            `
            let result = await ctx.executeSql(sql)  
            // {"code":"10000","msg":"请求成功","data":[{"sno":"s002","score":52.9},{"sno":"s003","score":20.9},{"sno":"s004","score":59.8},{"sno":"s005","score":50.8}]}
            return ctx.send(result)
        } catch (error) { return ctx.sendError(10002, error.message) }
    }


    
    static async test7 (ctx: any) {
        return ctx.send(
            await ctx.executeSql(`
                
                select sname,cname from sc
                left join student on sc.sno = student.sno
                left join course on sc.cno = course.cno

            `)
        )
    }

    static async test8 (ctx: any) {
        return ctx.send(
            await ctx.executeSql(`
                
                select sname,cname,score from sc
                left join student on sc.sno = student.sno
                left join course on sc.cno = course.cno
                where sc.score > 70

            `)
        )
    }

    static async test9 (ctx: any) {
        return ctx.send(
            await ctx.executeSql(`
                
                select student.sno,course.cno,course.cname,sc.score from sc
                left join student on sc.sno = student.sno
                left join course on sc.cno = course.cno
                where sc.score < 60
                order by course.cno DESC

            `)
        )
    }


    static async test10 (ctx: any) {
        return ctx.send(
            await ctx.executeSql(`
                
                select student.sno,student.sname from student 
                where student.sno not in (
                    select distinct sc.sno from sc 
                    left join student on sc.sno = student.sno
                    left join course on sc.cno = course.cno
                    left join teacher on course.tno = teacher.tno
                    where tname in ("諶燕")
                )  

            `)
        )
    }


    static async test11 (ctx: any) {
        return ctx.send(
            await ctx.executeSql(`
                
                select sno,avg(score) from sc
                where score < 60
                group by sno
                having count(score) >= 2
            `)
        )
        // {"code":"10000","msg":"请求成功","data":[{"sno":"s004","avg(score)":55.35},{"sno":"s005","avg(score)":55.35}]}
    }

    static async test12 (ctx: any) {
        return ctx.send(
            await ctx.executeSql(`
                
                select sno,score from sc
                where cno = "c004" AND score < 60
                order by score DESC
                
            `)
        ) 
    }

    static async test13 (ctx: any) {
        return ctx.send(
            await ctx.executeSql(`
                
                select a.sno from sc a, sc b
                where a.sno = b.sno AND a.cno = "c001" AND b.cno = "c002" AND a.score > b.score
                
            `)
        ) 
    }

    static async test14 (ctx: any) {
        return ctx.send(
            await ctx.executeSql(`
                
                select sno,avg(score) from sc
                group by sno
                having avg(score) > 60
            `)
        ) 
    }

    static async test15 (ctx: any) {
        return ctx.send(
            await ctx.executeSql(`
                
                select sc.sno,s.sname,count(sc.cno),sum(sc.score) from sc
                left join student s 
                on sc.sno = s.sno
                group by sc.sno

            `)
        ) 
    }

    static async test16 (ctx: any) {
        return ctx.send(
            await ctx.executeSql(`
                
                select count(*) from teacher 
                where tname like "劉%"

            `)
        ) 
    }



    
    
    


    static async test44 (ctx: any) {
        return ctx.send(
            await ctx.executeSql(`
                // 创建视图
                create view student_score as select sname,cname,score,tname from student
                left join sc using(sno) 
                left join course using(cno) 
                left join teacher using(tno)

                select * from student_score
            `)
        ) 
    }

    static async test45 (ctx: any) {
        return ctx.send(
            await ctx.executeSql(`
                
                select sno,sname from sc
                left join course on sc.cno = course.cno
                left join student on sc.sno = student.sno
                group by sc.sno
                having GROUP_CONCAT(distinct tno order by tno) = (select GROUP_CONCAT(tno order by tno) from teacher)

            `)
        ) 
    }
    


}
    