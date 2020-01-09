const fs = require('fs')
const ora = require('ora')
const path = require('path')
const fse = require('fs-extra')
const inquirer = require('inquirer')
const downloadTemplate = require('../download')

module.exports = async (args) => {
  const projectName = args[0]
  const projectFullPath = path.resolve(process.cwd(), projectName)

  if (fs.existsSync(projectFullPath)) {
    return
  }

  const downloadedTemplatePath = await downloadTemplate()

  const packageLockFile = `${downloadedTemplatePath}/package-lock.json`
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
      message: 'Install web-test?',
      default: true
    }
  ])

  if (!next.hasInstallT2JWebTest) {
    const _next = await prompt([{
      name: 'outputJSON',
      message: 'Output JSON file directory',
      default: './vf-json' // todo: get from git template
    }])

    next = Object.assign({}, next, _next)
  }
  else {
    next.outputJSON = './web-test/vf-json'
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
  const t2jConfigJSON = require('../download-temp/t2j.config')
  const dowonloadPackagePath = `${downloadedTemplatePath}/package.json`
  const dowonloadT2JConfigPath = `${downloadedTemplatePath}/t2j.config.json`

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
  fse.moveSync(downloadedTemplatePath, `${currentDir}/${projectName || createFailName}`)

  spinner.succeed('Done')
}
