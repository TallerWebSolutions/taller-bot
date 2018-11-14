require('dotenv/config')
const { spawn } = require('child_process');

if (!process.env.PORT) {
  console.error('You must define a PORT environment variable before executing "serve".')
  process.exit(1)
}

spawn(`ngrok`, ['http', process.env.PORT], { stdio: 'inherit' })
