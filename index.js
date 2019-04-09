#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const inquirer = require('inquirer');
const fs = require('fs');
const log = require('tracer').colorConsole()


program
    .version('3.0.0')
    .description('ting-cli(MVVM framework)应用模板工程的cli')
program
    .command('* init <project> <tpl>')
    .action(function(tpl, project) {
        if (tpl && project) {
            inquirer.prompt([{
                type:'input',
                name:'name',
                message: `Input the name of new project`,
                default: project
            }]).then((answerName) => {
                inquirer.prompt([{
                    type:'input',
                    name:'version',
                    message: `Input the version of your project`,
                    default: '0.0.1'
                }]).then((answerVersion) => {
                    inquirer.prompt([{
                        type:'input',
                        name:'description',
                        message: `Input the description of your project`,
                        default: 'A Project From ting-cli'
                    }]).then((answerDescription) => {
                        inquirer.prompt([{
                            type:'input',
                            name:'author',
                            message: `Input the author of your project`,
                            default: 'ting-cli'
                        }]).then((answerAuthor) => {
                            let pwd = shell.pwd()
                            let url = `https://github.com/wangzhongyu1009/ting-base.git`;
                            log.info(`正在${url}拉取模板代码 ...`)
                            clone(url, pwd + `/${answerName.name}`, null, function() {
                                shell.rm('-rf', pwd + `/${answerName.name}/.git`)
                                let data = fs.readFileSync(pwd + `/${answerName.name}` + '/package.json', 'utf-8');
                                let dataObj = JSON.parse(data)
                                dataObj.name = answerName.name
                                dataObj.version = answerVersion.version
                                dataObj.description = answerDescription.description
                                dataObj.author = answerAuthor.author
                                let dataStr = JSON.stringify(dataObj)
                                fs.writeFileSync(pwd + `/${answerName.name}` + '/package.json', dataStr);
                                log.info('``````````基于ting-cli模板工程建立完成```````````')
                            })
                        })
                    })
                })
            })
        } else {
            log.error('正确命令例子：ting-cli init myproject --webpack')
        }
    })
program.parse(process.argv)
