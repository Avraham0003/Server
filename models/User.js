const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const user_schema = new Schema({

    user_name: { // שם משתמש
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    user_email: { // מייל של המשתמש 
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    user_password: { // סיסמה של המשתמש
        type: String,
        required: true,
        trim: true
    }

});


user_schema.pre('save', async function(next){

    const hash = await bcrypt.hash(this.user_password, 10);
    this.user_password = hash;
    next();
})


module.exports = mongoose.model('users', user_schema);