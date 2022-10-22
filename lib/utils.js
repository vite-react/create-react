const ora = require('ora')

const sleep = (time)=> new Promise((resolve,reject) => setTimeout(resolve,time))

async function wrapLoading(fn,message,...args){  //制作loading
    const spinner = ora(message)
    spinner.start()
    try {
       let repos = await fn(...args)
       spinner.succeed()
       return repos
    } catch (error) {
        spinner.fail('request failed,refetch...')
        await sleep(1000)
        return wrapLoading(fn,message)
    }
 
 
}

module.exports = {
    sleep,
    wrapLoading
}
