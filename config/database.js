const mongoose = require('mongoose');

const url = process.env.DATABASE || 'mongodb+srv://avraham0003:fMAnMgJoSfSqduTS@cluster0.8t667dh.mongodb.net/PhotoSys';

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

