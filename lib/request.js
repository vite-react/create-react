const axios = require('axios')

axios.interceptors.request.use(config => {
    return config;
})
axios.interceptors.response.use(res => {
    return res.data
})

async function fetchRepoList(){
    return axios.get(`https://api.github.com/orgs/vite-react/repos`)
}

async function fetchTagList(repo){
    return axios.get(`https://api.github.com/repos/vite-react/${repo}/tags`)
}


module.exports = {
    fetchRepoList,
    fetchTagList
}
