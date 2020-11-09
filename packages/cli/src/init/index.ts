import yargs from 'yargs'
import Cli from '../../cli'
import {init} from '/Users/songjun/WorkSpace/学习/git/modules/simo-cli/packages/core/lib'

export default  (cli:Cli)=>{
cli.register('init <project-name>','初始化项目',(yargs:yargs)=>{
    yargs.positional('name', {
        type: 'string',
        describe: '项目名称'
      });
},(argv: any)=>{
    // init(cli,argv)

    console.log(cli,argv)
})
}