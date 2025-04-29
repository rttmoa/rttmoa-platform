@REM cmd /k "cd /d E:\Project\AccountSystem\ && npm start"





@echo off
call nvm use 18.18.0
cd /d "%~dp0"
start cmd /k "yarn start"