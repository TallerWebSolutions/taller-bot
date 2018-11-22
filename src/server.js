import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

/**
 * Middleware to hold raw body on request object.
 */
const rawBody = (req, res, next) => {
  req.rawBody = ''
  req.on('data', chunk => (req.rawBody += chunk))
  next()
}

morgan.token('body', ({ body }) => JSON.stringify(body))

export default express()
  .use(rawBody)
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(morgan('\n:method :url :status :res[content-length] - :response-time ms\n:body'))
