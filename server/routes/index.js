const userRouter = require('./UserRouter');
function route(app) {
  app.use('/admin', userRouter);
} 
module.exports = route;