const ora = require('ora')
const path = require('path')
const fes = require('fs-extra')
const download = require('download-git-repo')

module.exports = (URL, directory) => {
  const target = path.resolve(__dirname, `./download-temp/${directory}`)

  fes.ensureDirSync(target)

  return new Promise((resolve, reject) => {
    const spinner = ora(`Downloading template from ${URL}`)

    spinner.start()
    download(URL, target, {clone: false}, err => {
      if (err) {
        spinner.fail()
        reject(err)
        return
      }

      spinner.succeed()
      resolve(target)
    })
  })
}
