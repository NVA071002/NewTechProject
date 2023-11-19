const authRoute = require('./AuthRoutes');
function route(app) {
  app.use('/auth', authRoute);
//   app.use('/', siteRouter);

//   app.post('/search', (req, res) => {
//     res.send('');
//   });
}
module.exports = route;