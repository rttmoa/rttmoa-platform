 
######## 当前目录
@echo off
call nvm use 14.20.0
cd /d "%~dp0"
start cmd /k "yarn start"




@REM @REM ######## 桌面
@REM @echo off
@REM REM 使用指定 Node 版本
@REM call nvm use 14.20.0

@REM REM 切换到 upack 项目目录
@REM cd /d "E:\Project\upack\upack-kdfh@2.1.85"

@REM REM 启动项目（在新窗口中运行）
@REM start cmd /k "yarn start"

@REM echo upack-kdfh 项目已启动...
@REM pause
