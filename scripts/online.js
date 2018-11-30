/*
 * Serves a running application to the outer world via ngrok.
 */

/* eslint-disable no-console */

require('dotenv/config')

const localtunnel = require('localtunnel')
const request = require('request')

if (!process.env.PORT) {
  console.error(
    'You must define a PORT environment variable before executing "online".'
  )

  process.exit(1)
}

const proxyUrl =
  'https://wt-1cda89f1fbe853160953a0bb5aabe5f5-0.sandbox.auth0-extend.com/taller-bot-proxy/'

let tunnel = localtunnel(process.env.PORT, (err, tunnel) => {
  if (err) throw err

  console.log(`Local tunnel running at ${tunnel.url}`)

  const registerHost = () =>
    request.put(
      {
        baseUrl: proxyUrl,
        url: '/set-host',
        qs: { host: tunnel.url }
      },
      error =>
        error
          ? console.error('Could not claim proxy')
          : console.log('Captured proxy')
    )

  setInterval(registerHost, 10000)

  registerHost()
})

tunnel.on('close', function () {
  console.log('Local tunnel closed by the remote')
  process.exit(1)
})
