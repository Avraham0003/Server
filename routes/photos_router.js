
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const {
    get_all_photo,
    upload_photos,
    get_photos_by_event_id,
    delete_photo,
    is_selected_change_to_true,
    is_selected_change_to_false,
    toggleDisable,
    toggleSelected
    } = require('../controllers/photos_controller');

    
/* GET users listing. */
router.get('/all', get_all_photo); // get all photos
router.post('/upload/:event_id',upload.any('images'),upload_photos); // create new photo
router.delete('/delete/:photo_id',auth, delete_photo); // delete photo
router.get('/get_photos_by_event_id/:event_id', get_photos_by_event_id); // get photo by id
router.post('/toggleDisable/',auth, toggleDisable);
router.post('/toggleSelected/',auth, toggleSelected);
module.exports = router;
