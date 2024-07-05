
const apiRouter = require('./apis')
function route(app) {
  app.use('/api',apiRouter)
}
module.exports = route;