import { resolve } from 'path'
import { bold } from 'colors/safe'

import env from './env'
import { requireDir } from './utils'
import { server as logger } from './logger'

import server from './server'
import controller from './bot'

if (!env.PORT) {
  logger.error(`You must define the ${bold('PORT')} environment variable`)

  process.exit()
}

// Interconnect each main service.
server.set('controller', controller)
controller.server = server

// Initialize all modules.
requireDir(resolve(__dirname, './modules')).forEach(module => {
  // "init" gives you complete access to both the server and the controller.
  if (module.init) {
    module.init(server, controller)
  }

  // "slash" facilitates declaration of slash commands.
  if (module.slash) {
    controller.on('slash_command', (command, message) =>
      module.slash[message.command.replace('/', '')]
        ? module.slash[message.command.replace('/', '')](command, message)
        : null
    )
  }
})

// Initialize server.
server.listen(env.PORT, () =>
  logger.info(`Server running at http://localhost:${env.PORT}`)
)
