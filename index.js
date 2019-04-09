#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole()


program
    .version('0.0.1')
    .description('ting-cli(MVVM framework)应用模板工程的cli')
program
    .command('* init <project> <tpl>')
    .action(function(tpl, project) {
        log.info('目前ting-cli支持webpack模板，示例：ting-cli init myproject --webpack')
        if (tpl && project) {
            let pwd = shell.pwd()
            let url = `https://github.com/aaa.git`;
            log.info(`正在${url}拉取模板代码 ...`)
            clone(url, pwd + `/${project}`, null, function() {
                shell.rm('-rf', pwd + `/${project}/.git`)
                log.info('模板工程建立完成')
            })
        } else {
            log.error('正确命令例子：ting-cli init myproject --webpack')
        }
    })
program.parse(process.argv)
