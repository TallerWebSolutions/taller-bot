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
requireDir(resolve(__dirname, './modules')).forEach(({ init }) =>
  init ? init(server, controller) : null
)

// Initialize server.
server.listen(env.PORT, () =>
  logger.info(`Server running at http://localhost:${env.PORT}`)
)
