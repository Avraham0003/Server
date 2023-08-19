const mongoose = require('mongoose');
const User = require('./User'); // Replace with the actual path to the User model file

const Schema = mongoose.Schema;
const event_schema = new Schema({
    
    user_id:{
       type: String,
       required: true
    },
    event_name: { // שם האירוע
        type: String,
        required: true
    },
    event_date: { // תאריך האירוע
        type: Date,
        required: true
    },
    event_type: { // סוג האירוע
        type: String,
        required: true
    },
    event_owner: { // בעל האירוע
        type: String,
        required: true
    },
    event_hall: { // אולם
        type: String
    },
    event_photographers: { // צלמים באירוע
        //בעתיד קישור למשתמש - צלם
        type: Array,
        required: true
    },
    event_password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('events', event_schema);