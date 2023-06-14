const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer');//往命令行中添加选框的第三方插件
const { default: Choice } = require('inquirer/lib/objects/choice');
module.exports = async function (projectName, options) {
    console.log(projectName, options);
    // 创建项目  注意  因为该命令是全局的  就有可能存在 当前目录已有与要创建的文件名重名的现象 所以 要排查 给提示或者 强制覆盖

    const cwd = process.cwd()// 获取当前命令执行时的工作目录  node中的方法
    const targetDir = path.join(cwd.projectName)// 目标目录

    //判断当前目录是否存在
    if (fs.existsSync(targetDir)) {
        if (options.force) {// 如果强制创建  就删除已有的
            await fs.remove(targetDir)//如果用户传了 强制执行 --force  那么 就想原本文件移除  在进行创建
        } else {
            // 提示用户是否要强制覆盖  选框操作
            let { action } = await inquirer.prompt([//配置询问的方式,可以是多个
                {
                    name: 'action',
                    type: 'list',// 类型很多
                    message: `Target directory all ready exists Pick an action:`,
                    choice: [
                        { name: 'Overwrite', value: 'overwrite' },
                        { name: 'Cancel', value: false }
                    ]

                }
            ])
            console.log(action);

        }
    }


}