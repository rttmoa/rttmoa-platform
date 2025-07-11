 

@echo off
call nvm use 20.18.0
cd /d "%~dp0"
start cmd /k "yarn start"

