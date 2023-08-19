const mongoose = require('mongoose');

const url = process.env.DATABASE || 'mongodb://localhost:27017/main';

mongoose.set('strictQuery', true);

const connection = async () => {
    try {
        
        await mongoose.connect(url);

        console.log("database connected");

    } catch (error) {
        console.log(error);
    }
}
module.exports = connection;

