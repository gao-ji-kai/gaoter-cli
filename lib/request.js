//通过axios来获取结果 
const axios = require('axios');


axios.interceptors.response.use(res => res.data)


//先拿到仓库列表
async function fetchRepoList() {
    //可以通过配置文件 来拉取不同的仓库对应的文件
    return axios.get(`https://api.github.com/orgs/zhurong-cli/repos`)
}


module.exports = {
    fetchRepoList
}