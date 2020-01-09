const program = require('commander')
const packageInfo = require('../../package')

program.version(packageInfo.version)


// TODO: i18N
program.command('init')
       .description('Create a VF Project')
       .action(() => require('../cmd/init')(program.args))

program.command('delete')
       .description('Delete this VF Project')
       .action(() => require('../cmd/delete')())

program.command('update')
       .description('Update template')
       .action(() => require('../cmd/update ')())

program.parse(process.argv)
!program.args.length && program.help()

