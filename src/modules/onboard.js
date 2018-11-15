let debug = require('debug')('botkit:onboarding')

export default {
  init: function (server, controller) {
    controller.on('onboard', function (bot) {
      debug('Starting an onboarding experience!')

      if (controller.config.studio_token) {
        bot.api.im.open({ user: bot.config.createdBy }, function (
          err,
          directMessage
        ) {
          if (err) {
            debug('Error sending onboarding message:', err)
          }
          else {
            controller.studio
              .run(
                bot,
                'onboarding',
                bot.config.createdBy,
                directMessage.channel.id,
                directMessage
              )
              .catch(function (err) {
                debug(
                  'Error: encountered an error loading onboarding script from Botkit Studio:',
                  err
                )
              })
          }
        })
      }
      else {
        bot.startPrivateConversation({ user: bot.config.createdBy }, function (
          err,
          convo
        ) {
          if (err) {
            // eslint-disable-next-line
            console.log(err)
          }
          else {
            convo.say('I am a bot that has just joined your team')
            convo.say(
              'You must now /invite me to a channel so that I can be of use!'
            )
          }
        })
      }
    })
  }
}
