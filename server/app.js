const express=require('express');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const port=process.env.PORT || 8000;
const cors = require('cors');
const app=express();
const route = require('./routes');

const db=require('./config/db');

app.use(express.json());
// Limit IP is accepted to API -> It is enabling all request http
app.use(cors({ credentials: true, origin: true }));

db.connect();
route(app);

app.listen(port,()=>{
console.log(`listening on port ${port} ...`);
    
})