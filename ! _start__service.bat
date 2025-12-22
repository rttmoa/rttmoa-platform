@echo off
REM 一键启动服务端和客户端
REM 使用 Node.js 20.18.0
call nvm use 20.18.0

REM 服务端路径
set SERVER_PATH=E:\Project\rttmoa-platform\service

REM 客户端路径
set CLIENT_PATH=E:\Project\rttmoa-platform

REM 启动服务端（设置窗口标题）
cd /d "%SERVER_PATH%"
start cmd /k "title 【Client】前端服务 && yarn start"

REM 启动客户端（设置窗口标题）
cd /d "%CLIENT_PATH%"
start "client" cmd /k "title client && yarn start"

echo 服务端和客户端已启动...
pause
