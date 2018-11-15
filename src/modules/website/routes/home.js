/*
 * Home page route.
 */

export default (req, res) =>
  res.render('index', {
    domain: req.get('host'),
    protocol: req.protocol,
    layout: 'layouts/default'
  })
