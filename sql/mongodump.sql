! : 备份数据库：命令 — 导出：   

copy "C:\Users\Administrator\.node-red\package.json" "E:\Project\upack\upack-kdfh@2.1.85\@nodeRed\" 
copy "C:\Users\Administrator\.node-red\settings.js" "E:\Project\upack\upack-kdfh@2.1.85\@nodeRed\"


导出nodeRed：
copy "C:\Users\Administrator\.node-red\flows.json" "E:\Project\upack\upack-kdfh@2.1.85\@nodeRed\" 






导入：
mongorestore --host=127.0.0.1 --port=27017  -d steedos_kedongFH E:\Project\upack\upack-kdfh@2.1.85\@sql\steedos_kedongFH


导出：
mongodump -h 127.0.0.1 --port 27017 -d steedos_kedongFH -o E:\Project\rttmoa-platform-kd\sql

 