const path = require('path')
const fs = require('fs-extra')// fs-extra: 扩展了 Node.js 原生的文件系统模块（fs），提供了更多的方法，如复制、移动、删除等，方便文件的操作。
const inquirer = require('inquirer')//往命令行中添加选框的第三方插件 inquirer: 提供了一个交互式命令行界面，可以方便地与用户进行交互，获取输入数据。
const Creator = require('./Creator')


module.exports = async function (projectName, options) {
    // 创建项目  注意  因为该命令是全局的  就有可能存在 当前目录已有与要创建的文件名重名的现象 所以 要排查 给提示或者 强制覆盖

    const cwd = process.cwd()// 获取当前命令执行时的工作目录  node中的方法
    const targetDir = path.join(cwd, projectName)// 目标目录

    //判断当前目录是否存在
    if (fs.existsSync(targetDir)) {
        // 判断是否使用 --force 参数
        if (options.force) {// 如果强制创建  就删除已有的

            // 删除重名目录(remove是个异步方法)
            await fs.remove(targetDir)
        } else {
            // 提示用户是否要强制覆盖  选框操作
            let { action } = await inquirer.prompt([//配置询问的方式,可以是多个
                {
                    name: 'choice',
                    type: 'list',// 类型很多
                    message: `Target directory all ready exists Pick an action:`,
                    choices: [
                        { name: 'Overwrite', value: 'overwrite' },
                        { name: 'Cancel', value: false }
                    ]

                }
            ])
            if (!action) {
                return
            } else if (action === 'overwrite') {
                console.log(`\r\nRemoving...`);
                await fs.remove(targetDir)
            }

        }
    }
    // 创建项目
    const creator = new Creator(projectName, targetDir)
    creator.create();// 开始创建项目

}