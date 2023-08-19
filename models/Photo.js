const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const photo_schema = new Schema({

    event_id: { // id of father album
        type: String,
        required: true,
    },

    photo_link: { // the link to the photo
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    is_selected: { //  Photo selected by the client to the final album
        type: Boolean,
        default: false
    },

    disabled:{ // Photo disabled by the photographer
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('photos', photo_schema);