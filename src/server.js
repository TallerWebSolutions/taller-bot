import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

/**
 * Middleware to hold raw body on request object.
 */
const rawBody = (req, res, next) => {
  req.rawBody = ''
  req.on('data', chunk => (req.rawBody += chunk))
  next()
}

export default express()
  .use(rawBody)
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
