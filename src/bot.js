import path from 'path'
import Botkit from 'botkit'
import { bold } from 'colors/safe'
import botkitMongo from 'botkit-storage-mongo'

import env from 'app/env'
import logger from 'app/logger'

if (!env.clientId || !env.clientSecret) {
  logger.error(`You must define the following Slack environment variables:

  ${bold('clientId')}: Slack APP client id
  ${bold('clientSecret')}: Slack APP client secret
`)

  process.exit()
}

const config = {
  clientId: env.clientId,
  clientSecret: env.clientSecret,
  clientSigningSecret: env.clientSigningSecret,

  scopes: ['bot'],
  studio_token: env.studio_token,
  studio_command_uri: env.studio_command_uri
}

// Use a mongo database if specified, otherwise store in a JSON file local to the app.
// Mongo is automatically configured when deploying to Heroku
if (env.MONGO_URI) {
  config.storage = botkitMongo({ mongoUri: env.MONGO_URI })
}
else {
  config.json_file_store = path.resolve(__dirname, '../.data/db/')
}

// Create the Botkit controller, which controls all instances of the bot.
export default Botkit.slackbot(config)
