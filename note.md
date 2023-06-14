## 将包变成全局的

1.先创建可执行脚本  #! /user/bin/env node  用node环境去执行
2.配置package.json 中的bin字段
3.npm link 链接到本地环境(默认以name为准)



link相当于当将当前本地模块链接到npm目录下，这个npm目录可以直接访问，所以当前包就可以直接访问了
