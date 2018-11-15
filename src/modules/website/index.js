import path from 'path'
import express from 'express'
import hbs from 'express-hbs'

import home from './routes/home'
import login from './routes/login'
import oauth from './routes/oauth'

const viewsDir = path.resolve(__dirname, './views')
const partialsDir = path.resolve(viewsDir, './partials')

export default {
  init: (server, controller) => {
    server
      .engine('hbs', hbs.express4({ partialsDir }))
      .set('view engine', 'hbs')
      .set('views', viewsDir)
      .use(express.static(path.resolve(__dirname, './public')))

      // Define routes.
      .get('/', home)
      .get('/login', login)
      .get('/oauth', oauth)
  }
}
