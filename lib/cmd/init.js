const fs = require('fs')
const ora = require('ora')
const path = require('path')
const fse = require('fs-extra')
const inquirer = require('inquirer')
const downloadTemplate = require('../download')

module.exports = async (args) => {
  if (args.length < 2) {
    console.error('please create a project name: vf init [Project Name]')
    return
  }
  const projectName = args[0]
  const projectFullPath = path.resolve(process.cwd(), projectName)

  if (fs.existsSync(projectFullPath)) {
    return
  }

  const ts2jsonTemplateURL = 'vipkid-edu/vf-ts2json'//const URL = 'haojen/typescript-to-json'
  const downloadedT2JTemplatePath = await downloadTemplate(ts2jsonTemplateURL, 'ts2json')

  const packageLockFile = `${downloadedT2JTemplatePath}/package-lock.json`
  if (fse.pathExistsSync(packageLockFile)) {
    fse.removeSync(packageLockFile)
  }

  const prompt = inquirer.createPromptModule();

  let next = await prompt([
    {
      name: 'projectName',
      message: 'Project Name:',
      default: projectName,
      validate: function (input) {
        if (!input) {
          return 'Not valid project name!'
        }
        return true
      }
    },
    {
      name: 'projectDescription',
      message: 'Project description:',
      default: ''
    },
    {
      type: 'confirm',
      name: 'hasInstallT2JWebTest',
      message: 'Install Vue template test?',
      default: true
    }
  ])

  let webTemplatePath = null;
  if (!next.hasInstallT2JWebTest) {
    const _next = await prompt([{
      name: 'outputJSON',
      message: 'Output JSON file directory path:',
      default: './vf-json' // todo: get from git template
    }])

    next = Object.assign({}, next, _next)
  }
  else {
    next.outputJSON = '../web/vf-json'
    const webTemplateURL = 'vipkid-edu/vf-vue-template'
    webTemplatePath = await downloadTemplate(webTemplateURL, 'web')
  }

  const _next = await prompt([
    {
      name: 'projectAuthor',
      message: 'Author:',
      default: ''
    }
  ])

  const spinner = ora(`Creating Project: ${next.projectName}`)
  spinner.start()

  const input = Object.assign({}, next, _next)
  const templatePackageJSON = require('../template/package')
  const t2jConfigJSON = require('../download-temp/ts2json/t2j.config')
  const dowonloadPackagePath = `${downloadedT2JTemplatePath}/package.json`
  const dowonloadT2JConfigPath = `${downloadedT2JTemplatePath}/t2j.config.json`

  t2jConfigJSON.output = input.outputJSON
  templatePackageJSON.name = input.projectName
  templatePackageJSON.author = input.projectAuthor
  templatePackageJSON.description = input.projectDescription


  fse.outputJsonSync(
    dowonloadPackagePath,
    templatePackageJSON,
    { spaces: 2 }
  )

  fse.outputJsonSync(
    dowonloadT2JConfigPath,
    t2jConfigJSON,
    { spaces: 2 }
  )

  const currentDir = process.cwd()
  const createFailName = `T2J-${new Date().getTime()}`
  const downloadTemplateBasePath = webTemplatePath ? path.resolve(__dirname, `../download-temp/`) : downloadedT2JTemplatePath
  console.log(downloadTemplateBasePath, 'path')
  fse.moveSync(downloadTemplateBasePath, `${currentDir}/${projectName || createFailName}`)

  spinner.succeed('Done')
}
