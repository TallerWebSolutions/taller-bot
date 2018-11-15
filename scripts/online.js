/*
 * Serves a running application to the outer world via ngrok.
 */

/* eslint-disable no-console */

require('dotenv/config')
const { spawn } = require('child_process')

if (!process.env.PORT) {
  console.error(
    'You must define a PORT environment variable before executing "online".'
  )

  process.exit(1)
}

spawn('ngrok', ['http', process.env.PORT], { stdio: 'inherit' })
