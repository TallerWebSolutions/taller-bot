function shuffle (array) {
  let i = 0
  let j = 0
  let temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const toTextualList = items =>
  items.map((item, i, arr) =>
    i > 0 ? (i === arr.length - 1 ? ' and ' : ', ') + item : item
  ).join('')

export default {
  init: (server, controller) => {
    controller.hears('foobar', '', (bot, message) => {
      bot.reply(message, 'Caraca')
    })
  },

  slash: {
    choose: (bot, message) => {
      let [amount, list] = message.text.split('from')

      list = list === undefined ? amount : list
      amount = parseInt(amount) || 1

      const plural = amount > 1

      const items = list
        .split(/,|[, ]e |[, ]ou |[, ]or /)
        .map(text => text.trim())
        .filter(Boolean)

      shuffle(items)

      bot.replyPublic(
        message,
        `Here ${plural ? 'are' : 'is'} my choice${
          plural ? 's' : ''
        }: ${toTextualList(items.slice(0, amount))}`
      )
    }
  }
}
