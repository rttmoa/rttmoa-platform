import { exec } from "child_process";

// 设置日期为 2021-03-20
exec('date 2021-03-20', (err, stdout, stderr) => {
  if (err) {
    console.error(`错误: ${err.message}`);
    return;
  }
  console.log(stdout);
});

// 设置时间为 10:30:00
exec('time 10:30:00', (err, stdout, stderr) => {
  if (err) {
    console.error(`错误: ${err.message}`);
    return;
  }
  console.log(stdout);
});