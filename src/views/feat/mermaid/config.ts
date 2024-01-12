export const MermaidConfig1 = `graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
`;

export const MermaidConfig2 = `sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?`;

export const MermaidConfig3 = `---
title: Example Git diagram
---
gitGraph
  commit
  commit
  branch develop
  commit
  commit
  commit
  checkout main
  commit
  commit
  merge develop
  commit
  commit
`;

export const MermaidConfig4 = `quadrantChart
title Reach and engagement of campaigns
x-axis Low Reach --> High Reach
y-axis Low Engagement --> High Engagement
quadrant-1 We should expand
quadrant-2 Need to promote
quadrant-3 Re-evaluate
quadrant-4 May be improved
Campaign A: [0.3, 0.6]
Campaign B: [0.45, 0.23]
Campaign C: [0.57, 0.69]
Campaign D: [0.78, 0.34]
Campaign E: [0.40, 0.34]
Campaign F: [0.35, 0.78]
`;

export const InitMarkup = `# 登录注册模块功能页面结构图

- 登录页面
  - 输入用户名
    - 1
  - 输入密码
  - 登录按钮
  - 忘记密码链接
  - 注册链接

- 注册页面
  - 输入用户名
  - 输入密码
  - 确认密码
  - 注册按钮
  - 返回登录链接

- 忘记密码页面
  - 输入注册邮箱
  - 发送重置密码链接按钮
  - 返回登录链接

- 重置密码页面
  - 输入新密码
  - 确认新密码
  - 重置密码按钮
  - 返回登录链接

`;
