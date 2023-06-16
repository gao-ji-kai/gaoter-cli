const { fetchRepoList, fetchTagList } = require('./request')
const inquirer = require('inquirer');
const { wrapLoading } = require('./util')
const downloadGitRepo = require('download-git-repo') // 不支持 Promise
const util = require('util')//将不是promise方法转换成promise方法
const path = require('path')
class Creator {
    constructor(projectName, targetDir) { //new 的时候会调用构造函数
        this.name = projectName;
        this.target = targetDir;
        // 此时这个方法就是一个promise方法了
        this.downloadGitRepo = util.promisify(downloadGitRepo)
    }
    // 拉取仓库  
    async fetchRepo() {
        //有一种情形  网络好的话 直接下载  网络不好的话  显示loading  并重新拉取
        let repos = await wrapLoading(fetchRepoList, 'waiting fetch template')
        if (!repos) return
        repos = repos.map(item => item.name)
        let { repo } = await inquirer.prompt({
            name: 'repo',
            type: 'list',
            choices: repos,
            message: 'please choose a template to create project'
        })
        console.log(repos, 'repos');
        console.log(repo, 'repo');
        return repo;
    }
    // 拉取版本 
    async fetchTage(repo) {
        let tags = await wrapLoading(fetchTagList, 'waiting fetch tag', repo)
        if (!tags) return;

        tags = tags.map(item => item.name)
        let { tag } = await inquirer.prompt({
            name: 'tag',
            type: 'list',
            choices: tags,
            message: 'please choose a tag to create project'
        })
        return tag;

    }
    async download(repo, tag) {
        // 1.需要先拼接出下载路径
        const requestUrl = `zhurong-cli/${repo}${tag ? '#' + tag : ''}`;

        // 2.把资源下载到某个路径中 (后续可增加缓存功能,原则上应该下载到系统目录中，稍后可以使用ejs handlerbar 去渲染模板，最后生成结果，再写入)

        // await this.downloadGitRepo(requestUrl, path.resolve(process.cwd(), `${repo}@${tag}`))

        await wrapLoading(
            this.downloadGitRepo, // 远程下载方法
            'waiting download template', // 加载提示信息
            requestUrl, // 参数1: 下载地址
            path.resolve(process.cwd(), this.target)) // 参数2: 创建位置
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
        console.log(repo, tag);
        //(3) 下载
        await this.download(repo, tag)



        // 2.要实现脚手架  先做一个命令行交互的功能  inquirer


        // 3.将模板下载下来  download-git-repo

        // 单独写个类去生成模板
        // 4.远程下载  根据用户的选择动态生成内容 metalsmith


    }
}

module.exports = Creator