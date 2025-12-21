


备份到此目录下：

  mongodump -h 127.0.0.1 --port 27017 -d steedos_nbzy_v2 -o E:\Project\rttmoa-platform\service\sql\



导入数据库：

  mongorestore --host=127.0.0.1 --port=27017  -d steedos_nbzy_v2 C:\