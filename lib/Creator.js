const { fetchRepoList } = require('./request')
const inquirer = require('inquirer');
const { Loading } = require('./util')

class Creator {
    constructor(projectName, targetDir) { //new 的时候会调用构造函数
        this.name = projectName;
        this.target = targetDir;

    }
    async fetchRepo() {
        //有一种情形  网络好的话 直接下载  网络不好的话  显示loading  并重新拉取
        let repos = await Loading(fetchRepoList, 'waiting fetch template')
        if (!repos) return
        repos = repos.map(item => item.name)
        let { repo } = await inquirer.prompt({
            name: 'repo',
            type: 'list',
            choice: repos,
            message: 'please choose a template to create project'
        })
        console.log(repos, 'repos');
        console.log(repo, 'repo');
        return repo;
    }

    async fetchTage() {

    }
    async download() {

    }

    async create() {
        //真实开始创建

        /*
         采用远程拉取的方式拉取模板 github  不用版本对应不通模板
             (1) 先拉取当前组织下的模板
             (2) 通过模板找到版本号
             (3) 下载
             (3) 编译  根据用户选择的模板进行编译
        */
        // (1) 先拉取当前组织下的模板
        let repo = await this.fetchRepo()
        // (2) 通过模板找到版本号
        let tag = await this.fetchTage(repo)
        //(3) 下载
        let downloadUrl = await this.download(repo, tag)



        // 2.要实现脚手架  先做一个命令行交互的功能  inquirer


        // 3.将模板下载下来  download-git-repo

        // 单独写个类去生成模板
        // 4.远程下载  根据用户的选择动态生成内容 metalsmith
        console.log(this.name, this.target);

    }
}

module.exports = Creator