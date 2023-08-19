const Event = require('../models/Event');
const Photo = require('../models/Photo');
module.exports = {
    /* get_all_events: async (req, res) => { // בקשה לשרת להחזרת כל האירועים
        try {
            const events = await Event.find();
            return res.json({
                events
            });
        } catch (error) {
            return res.status(500).json({
                message: "error in getting all events",
                error: error.message
            });
        }

    }, */

    get_all_events_by_user: async (req, res) => { // בקשה לשרת להחזרת כל האירועים
        try {
            const events = await Event.find({user_id:req.params.user_id});
            return res.json({
                events
            });
        } catch (error) {
            return res.status(500).json({
                message: "error in getting all events",
                error: error.message
            });
        }

    },


    get_event_by_id: async (req, res) => { // בקשה להחזרת אירוע ספציפי לפי אידי
        try {
            const event = await Event.findById(req.params.event_id);
            return res.json(event);
        } catch (error) {
            return res.status(500).json({
                message: "error in getting event by id",
                error: error.message
            });
        }
    },

    create_event: async (req, res) => {j 
        try {
            const {
                user_id,
                event_name,
                event_date,
                event_type,
                event_owner,
                event_hall,
                event_photographers
            } = req.body;

        
         /*    const event = await Event */
            
            if (user_id == null || event_name == null || event_date == null || event_type == null || event_owner == null || event_hall == null || event_photographers == null) {
                throw new Error('Please complete all the fields!');
            }
            if (!user_id || !event_name || !event_date || !event_type || !event_owner || !event_hall || !event_photographers) {
                throw new Error('Please complete all the fields!');
            }


            let event_password_arr = new Date(event_date).toLocaleDateString('en-GB', {year:"numeric", month:"numeric", day:"numeric"})
            event_password_arr = event_password_arr.split('/');
            let event_password = event_password_arr[0] + event_password_arr[1] + event_password_arr[2];
 
            const new_event = new Event({
                user_id,
                event_name,
                event_date,
                event_type,
                event_owner,
                event_hall,
                event_photographers,
                event_password
            });

            await new_event.save();

            return res.status(200).json({
                success: true,
                message: 'add new event successfully',
                new_event
            });

        } catch (error) {
            return res.status(500).json({
                message: "error in creating event",
                error: error.message
            });
        }

    },

    update_event: async (req,res) => {

        try {
            console.log(req.body);
            await Event.findByIdAndUpdate(req.params.event_id,req.body);

            return res.status(200).json({
                success: true,
                message: 'event updated successfully',
                updated: req.body

            });
        } catch (error) {
            return res.status(500).json({
                message: "error to update event",
                error: error.message
            })
        }
    },

    delete_event: async (req, res) => {

        try {
            const event_id  = req.params.event_id;
            await Photo.deleteMany({event_id:event_id});     
            await Event.findByIdAndDelete(event_id);
            return res.status(200).json({
                success: true,
                message: 'Event deleted successfully'
            });

        } catch (error) {
            return res.status(500).json({
                message: "error in deleting event",
                error: error.message
            });

        }
    },
    
    upload_images_to_event : async(req, res)=>{
        try {
            let new_event_photos = [];
            for(let i=0; i<req.files.length; i++) {
                new_event_photos[i] = req.files[i].path.replace('\\', '/');
            }
            const event_id = req.params.event_id;
            await Event.findByIdAndUpdate(event_id , {event_photos : new_event_photos});
            res.status(200).json({
                success: true,
                message: 'event photos updated successfully'
            });

        } catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    },

    get_images : async(req, res) => {
        try {
            const event_id = req.params.event_id;
            const event = await Event.findById(event_id);
            return res.json(event.event_photos);
        } catch (error) {
            return res.status(500).json({
                message: "error in getting images",
                error: error.message
            });
        }
    },
    get_event_name : async(req, res) => {
        try {
            const event = await Event.findById(req.params.event_id);
            return res.json(event.event_name);
        } catch (error) {
            return res.status(500).json({
                message: "error in getting event name",
                error: error.message
            });
        }
    }

}