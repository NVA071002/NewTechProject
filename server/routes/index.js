const authRoute = require('./AuthRoutes');
function route(app) {
  app.use('/auth', authRoute);
}
module.exports = route;