import logging from 'app/logger'

const logger = logging.scope('Webhooks')

export default {
  init: (server, controller) => {
    server.post('/slack/receive', (req, res) => {
      // Inform Slack that the webhook has been received.
      res.status(200)

      // Process the payload.
      controller.handleWebhookPayload(req, res)
    })
  }
}
