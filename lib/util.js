const ora = require('ora')

//延时
async function sleep(n) {
    return new Promise((resolve, reject) => setTimeout(resolve, n));
}

//Loading
async function Loading(fn, message) {
    const spinner = ora(message)
    spinner.start();//开启加载
    try {
        let repos = await fn()
        spinner.succeed()//成功
        return repos
    } catch (e) {
        spinner.fail('request faild ,fetch...')//失败
        //失败不能马上抓取 需要延迟
        await sleep(1000)
        return Loading(fn, message)
    }

}

module.exports = {
    Loading
}