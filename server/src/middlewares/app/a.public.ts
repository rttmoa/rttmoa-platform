import serve from "koa-static";
import path from "path";

// * 静态服务器中间件
const _Public = () => {
  return serve(path.join(__dirname, "../../../public"), {
    setHeaders: (res, filePath) => {
      const extname = path.extname(filePath);
      switch (extname) {
        case ".html":
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          break;
        case ".png":
          res.setHeader("Content-Type", "image/png");
          break;
        case ".jpg":
        case ".jpeg":
          res.setHeader("Content-Type", "image/jpeg");
          break;
        case ".gif":
          res.setHeader("Content-Type", "image/gif");
          break;
      }
    },
  });
};

export default _Public;
