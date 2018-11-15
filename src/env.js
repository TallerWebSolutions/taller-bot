/*
 * Application environment variables.
 * ----------------------------------
 * Single environment reading file to improve performance.
 */

import 'dotenv/config'

const env = {
  // Slack API.
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  clientSigningSecret: process.env.clientSigningSecret,

  // Server.
  PORT: process.env.PORT,
  // MONGO_URI
  // PROJECT_DOMAIN
}

export default env