/*
 * Login page route.
 */

export default ({ app }, res) =>
  res.redirect(app.get('controller').getAuthorizeURL())
