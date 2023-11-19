const mongoose=require('mongoose');

async function connect(){
    mongoose.connect('mongodb://127.0.01:27017/ItTopicManagement', {
        useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log('Connected to MongoDB...'))
     .catch(err => console.error('Could not connect to MongoDB...', err));
}
module.exports ={connect}

        