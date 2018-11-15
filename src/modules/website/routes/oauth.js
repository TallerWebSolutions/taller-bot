/*
 * OAuth route.
 */

import logger from '../logger'

export default ({ app, query }, res) => {
  const controller = app.get('controller')

  // We need to use the Slack API, so spawn a generic bot with no token
  const slackapi = controller.spawn({})

  const opts = {
    client_id: controller.config.clientId,
    client_secret: controller.config.clientSecret,
    code: query.code
  }

  slackapi.api.oauth.access(opts, function (err, auth) {
    if (err) {
      logger.error('Could not confirm oAuth', err)
      return res.redirect('/login_error.html')
    }

    // use the token we got from the oauth
    // to call auth.test to make sure the token is valid
    // but also so that we reliably have the team_id field!
    slackapi.api.auth.test({ token: auth.access_token }, (err, identity) => {
      if (err) {
        logger.error('Could not fetch user identity', err)
        return res.redirect('/login_error.html')
      }

      // Now we've got all we need to connect to this user's team
      // spin up a bot instance, and start being useful!
      // We just need to make sure this information is stored somewhere
      // and handled with care!

      // In order to do this in the most flexible way, we fire
      // a botkit event here with the payload so it can be handled
      // by the developer without meddling with the actual oauth route.

      auth.identity = identity
      controller.trigger('oauth:success', [auth])

      res.cookie('team_id', auth.team_id)
      res.cookie('bot_user_id', auth.bot.bot_user_id)
      res.redirect('/login_success.html')
    })
  })
}
