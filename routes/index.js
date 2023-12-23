const adminRouter = require('./AdminRouter');


function route(app) {
  app.use('/admin', adminRouter);
} 
module.exports = route;