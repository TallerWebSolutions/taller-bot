export default {
  init: (server, controller) => {
    controller.hears('O que vamos fazer hoje a noite', 'app_mention', (bot, message) => {
      bot.reply(message, `A mesma coisa que fazemos todas as noites, <@${message.user}> - Tentar dominar o mundo!`)
    })
  }
}
