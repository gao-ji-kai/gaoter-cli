## 将包变成全局的

1.先创建可执行脚本 #! /user/bin/env node 用 node 环境去执行 2.配置 package.json 中的 bin 字段
3.npm link 链接到本地环境(默认以 name 为准)

link 相当于当将当前本地模块链接到 npm 目录下，这个 npm 目录可以直接访问，所以当前包就可以直接访问了

开发脚手架用到的第三方依赖库有这些

chalk: 用于在控制台输出彩色的文本，使输出信息更加清晰易读。
commander: 是一个命令行接口工具，可以轻松地创建命令行应用程序，并解析命令行参数。
dotenv: 用于加载环境变量，从而避免将配置敏感信息硬编码到代码中。
download-git-repo: 用于从 Git 仓库下载文件或整个仓库，支持多种协议（如 HTTP、SSH）和分支。
fs-extra: 扩展了 Node.js 原生的文件系统模块（fs），提供了更多的方法，如复制、移动、删除等，方便文件的操作。
inquirer: 提供了一个交互式命令行界面，可以方便地与用户进行交互，获取输入数据。
ora: 用于在控制台显示进度条或者一些符号，表示正在进行某个耗时的操作，提高用户体验。
