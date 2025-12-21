@echo off
REM 一键启动服务端和客户端
REM 使用 Node.js 20.18.0
call nvm use 20.18.0

REM 服务端路径
set SERVER_PATH=C:\Upack\rttmoa-platform\service

REM 客户端路径
set CLIENT_PATH=C:\Upack\rttmoa-platform

REM 启动服务端
cd /d "%SERVER_PATH%"
start cmd /k "yarn start"

REM 启动客户端
cd /d "%CLIENT_PATH%"
start cmd /k "yarn start"

echo 服务端和客户端已启动...
pause




@echo off
REM 一键启动服务端和客户端
REM 使用 Node.js 20.18.0
call nvm use 20.18.0

REM 服务端路径
set SERVER_PATH=E:\Project\rttmoa-platform-kd\service

REM 客户端路径
set CLIENT_PATH=E:\Project\rttmoa-platform-kd

REM 启动服务端
cd /d "%SERVER_PATH%"
start cmd /k "yarn start"

REM 启动客户端
cd /d "%CLIENT_PATH%"
start cmd /k "yarn start"

echo 服务端和客户端已启动...
pause
