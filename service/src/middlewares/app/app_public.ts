import { Request, Response } from "koa";
import serve from "koa-static";

// * 静态服务器中间件
export default (app: any): any => {
	app.use(
		serve("./public", {
			setHeaders: (res, path, stats) => {
				let extname = require("path").extname(path);
				// 根据扩展名设置不同的响应头，如果这里不设置，会在sendHandle中统一设置成json格式，那么静态资源也会以json格式返回，浏览器不能正常展示
				switch (extname) {
					case ".html":
						res.setHeader("Content-Type", "text/html;charset=utf-8");
						break;
					case ".png":
					case ".jpg":
					case ".gif":
					case ".bmp":
						res.setHeader("Content-Type", "image/png;charset=utf-8");
						break;
				}
			},
		})
	);
};
