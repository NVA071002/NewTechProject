const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

async function connect(){
    mongoose.connect(`${process.env.MONGO_DB}`, {
        useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log('Connected to MongoDB...'))
     .catch(err => console.error('Could not connect to MongoDB...', err));
}
module.exports ={connect}

        