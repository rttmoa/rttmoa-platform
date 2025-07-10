# 使用 Node.js 18.18.0 作为基础镜像
FROM node:18.18.0

# 设置工作目录
WORKDIR /app

# 复制 yarn.lock
COPY yarn.lock ./

# 安装依赖
RUN yarn

# 复制项目文件到容器
COPY . .

# 暴露端口（Koa 运行的端口）
EXPOSE 9089

# 启动服务
CMD ["yarn", "start"]
