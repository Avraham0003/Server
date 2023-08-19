
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.js');
const auth = require('../middlewares/auth');

const {
    get_event_name,
    get_all_events_by_user,
    create_event,
    get_event_by_id,
    delete_event,
    update_event,
    upload_images_to_event,
    get_images
    } = require('../controllers/events_controller.js');

    
/* GET users listing. */
router.get('/all/:user_id', get_all_events_by_user); // get all events
router.post('/create',auth, create_event); // create new event
router.delete('/delete/:event_id',auth, delete_event); // delete event
router.get('/get_by_id/:event_id', get_event_by_id); // get event by id
router.put('/update/:event_id',auth, update_event); // update event
router.get('/getImages/:event_id',auth, get_images);
router.post('/upload/:event_id',auth, upload.any('images') ,upload_images_to_event)
router.get('/get_event_name/:event_id', get_event_name)


module.exports = router;
