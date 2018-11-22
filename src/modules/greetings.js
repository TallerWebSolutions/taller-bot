export default {
  init: (server, controller) => {
    controller.hears(['dormir', 'boa noite'], 'app_mention', (bot, message) => {
      bot.reply(message, 'Dormir é pra humanos...')
    })
  }
}
