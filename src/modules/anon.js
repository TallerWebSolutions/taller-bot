export default {
  slash: {
    anon: (bot, message) => {
      bot.replyAcknowledge()

      bot.say({
        text: `*[mensagem anônima]* ${message.text}`,
        channel: message.channel
      })
    }
  }
}
