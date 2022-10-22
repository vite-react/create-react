#! /usr/bin/env node



//1. 配置可执行命令  commander

const program = require('commander')
const chalk = require('chalk')

//核心功能 1.创建项目  3.更改配置文件  3.ui界面 @vue/ui


program
    .command('create <app-name>')
    .description('create a new project')
    .option('-f, --force','overwrite target directory if it exists')
    .action((name,cmd) => {
      require('../lib/create.js')(name,cmd)
        console.log(name,cmd);
    })

program 
    .command('config [value]')
    .description('inspect an modify the config')
    .option('-g, --get <path>','get value from option')
    .option('-s, --set <path> <value>')
    .option('-d, --delete <path>','delete option from config')
    .action((value,cmd) => {
        console.log(value,cmd);
    })


program
    .command('ui')
    .description('start and open create-react ui')
    .option('-p, --port <port>','port used for the UI Server')
    .action((cmd) => {
        console.log(cmd);
    })

program
    .version(`${require('../package.json').version}`)
    .usage(`<command> [option]`)


program.on('--help',function(){
    console.log();
    console.log(`Run ${chalk.cyan(` create-react <command> --help`)} show details`);
    console.log();
})   
//解析用户执行命令传入的参数
program.parse(process.argv)

//2.我们要实现脚手架  先做一个命令行交互的功能  inquirer

//3.将模板下载下来  dowload-git-repo

// 4.根据用户的选择动态的生成内容  metalsmith
