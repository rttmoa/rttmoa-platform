/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// 生成 token
// 验证 token

import { config } from "@/src/config/config";
import jwt from "jsonwebtoken";
 

//& 生成 token、 验证token   如果没有token或者token过期，返回错误信息
const sign = (data = {}) => {
  return jwt.sign(data, config.jwtSecret, { expiresIn: 60 * 60 * 24 * 7 }); // 60 * 60 = 3600秒 = 1小时 * 24 * 7 = 7天
};


const verify = (req: any, res: any, next: any) => {
  const authorization = req.headers.authorization || req.body.token || req.query.token;
  let token = "";
  if (authorization.includes("Bearer")) {
    token = authorization.replace("Bearer ", "");
  } else {
    token = authorization;
  }
  console.log('请求的 token：', token);
  jwt.verify(token, config.jwtSecret, (error: any, data: any) => {
    if (error) {
      res.json({ error: 1, data: "token验证失败" });
    } else {
      // req._id = data?._id;
      next();
    }
  });
};

export {
  sign,
  verify
};