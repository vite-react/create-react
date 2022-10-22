const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Ctreator = require('./Ctreator')


module.exports = async function(projectName,options){
  const cwd = process.cwd()//获取当前命令执行时的工作目录
  const targetDir = path.join(cwd,projectName)//目标目录

  if(fs.existsSync(targetDir)){
    if(options.force){
      await fs.remove(targetDir)
    }else{
      //提示用户是否确定覆盖

      const {action} = await inquirer.prompt([
        {
          name:'action',
          type:'list',
          message:'Target dinectory already exists Pick an action',
          choices:[
            {
              name:'Overwrite',value:'Overwrite'
            },
            {
              name:'Cancel',value:false
            }
          ]
        }
      ])
      if(!action){
        return
      }else if(action === 'Overwrite'){
        console.log(`\r\nRemoving...`);
        await fs.remove(targetDir)
      }
    }
  }
  //创建项目

  const creator = new Ctreator(projectName,targetDir)
   creator.create()
}