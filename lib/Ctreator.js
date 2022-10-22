const inquirer = require("inquirer")
const { fetchRepoList, fetchTagList } = require("./request")
const {wrapLoading} = require('./utils')
const downloadGitRepo = require('download-git-repo')//不支持promise
const util = require('util')
const path = require('path')

class Ctreator {
    constructor(projectName,targetDir) {
        this.name = projectName
        this.target = targetDir
         //转换成promise方法
        this.downloadGitRepo = util.promisify(downloadGitRepo)
    }

    async fetchRepo(){
        //失败重新获取
        let repos = await wrapLoading(fetchRepoList,'watiing fetch template')
        if(!repos)return
        repos = repos.map(item => item.name)

        let {repo} = await inquirer.prompt({
            name:'repo',
            type:'list',
            choices:repos,
            message:'please choices a template to create project'
        })
        return repo

    }
    async fetchTag(repo){
        let tags = await wrapLoading(fetchTagList,'waiting fetch tag',repo)
        if(!tags) return
        tags = tags.map(item => item.name)

        let {tag} = await inquirer.prompt({
            name:'tag',
            type:'list',
            choices:tags,
            message:'please choices a tag to create project'
        })
        return tag

    }
    async downLoad(repo,tag){
        console.log(repo,tag);
        //1需要拼接下载路径
        let requestUrl = `vite-react/${repo}${tag?'#'+tag:''}`
        //2.把资源下载在某个路径下，(后续可以增加缓存功能,应该下载到系统目录中，稍后可以使用ejs handlerbar 去渲染模板 最后生成结果 再写入)
        await wrapLoading(this.downloadGitRepo,'waiting download templete',requestUrl,path.resolve(process.cwd(),`${repo}@${tag}`))
        // await this.downloadGitRepo(requestUrl,path.resolve(this.target,`@${tag}`))

        return this.target

        
    }
    async create(){
        //开始创建
        //先拉取当前组织下的模板

        let repo = await this.fetchRepo()
        console.log(repo);

        //通过模板找到版本号

        let tag = await this.fetchTag(repo)
        
        // //下载
        let downloadUrl = await this.downLoad(repo,tag)

        //模板编译


    }

}

module.exports = Ctreator
