const Photo = require('../models/Photo');
module.exports = {
    get_all_photo: async (req, res) => {
        try {
            const photos = await Photo.find();
            return res.json({
                photos
            });
        } catch (error) {
            return res.status(500).json({
                message: "error in getting all events",
                error: error.message
            });
        }

    },

    get_photos_by_event_id: async (req, res) => {
        try {
            let event_id = req.params.event_id;
    
            const allPhotosAggregation = [
                { $match: { event_id: event_id } },
                { $addFields: { src: { $concat: [process.env.VITE_SERVER_URL, "/", "$photo_link"] }, name: "$_id" } }
            ];
    
            const photosToDevelopAggregation = [
                { $match: { event_id: event_id, is_selected: true } },
                { $addFields: { src: { $concat: [process.env.VITE_SERVER_URL, "/", "$photo_link"] }, name: "$_id" } }
            ];
    
            const disabledPhotosAggregation = [
                { $match: { event_id: event_id, disabled: true } },
                { $addFields: { src: { $concat: [process.env.VITE_SERVER_URL, "/", "$photo_link"] }, name: "$_id" } }
            ];
    
            const allPhotos = await Photo.aggregate(allPhotosAggregation);
            const photosToDevelop = await Photo.aggregate(photosToDevelopAggregation);
            const disabledPhotos = await Photo.aggregate(disabledPhotosAggregation);
    
            return res.status(200).json({
                success: true,
                message: 'photos to event: ' + event_id,
                allPhotos,
                photosToDevelop,
                disabledPhotos
            });
        } catch (error) {
            return res.status(500).json({
                message: "error in getting photos by id",
                error: error.message
            });
        }
    },
    
    upload_photos: async (req, res) => {

        try {
            const event_id = req.params.event_id;
            let new_event_photos = [];
            for (let i = 0; i < req.files.length; i++) {
                new_event_photos[i] = req.files[i].path.replace('\\', '/');
            }
            new_event_photos.map(async (photo) => {
                if (photo == null) {
                    throw new Error('Please Add Photos!');
                }
                if (!photo) {
                    throw new Error('Please Add Photos!');
                }
                const SavePhoto = new Photo({
                    event_id: event_id,
                    photo_link: photo,
                    is_selected: false,
                    disabled: false
                });
                await SavePhoto.save();
            });
            return res.status(200).json({
                success: true,
                message: 'add new photos successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: "error in creating Photo",
                error: error.message
            });
        }

    },

    is_selected_change_to_true: async (req, res) => {
        try {
            const photo_id = req.params.photo_id;

            await Photo.findByIdAndUpdate(photo_id, { is_selected: true });

            return res.status(200).json({
                success: true,
                message: 'photo selected successfully',
                is_selected: true
            });
        } catch (error) {
            return res.status(500).json({
                message: "error to select photo",
                error: error.message
            })
        }
    },
    is_selected_change_to_false: async (req, res) => {
        try {
            const photo_id = req.params.photo_id;

            await Photo.findByIdAndUpdate(photo_id, { is_selected: false });

            return res.status(200).json({
                success: true,
                message: 'photo selected successfully',
                is_selected: false
            });
        } catch (error) {
            return res.status(500).json({
                message: "error to select photo",
                error: error.message
            })
        }
    },

    delete_photo: async (req, res) => {

        try {

            const photo_id = req.params.photo_id;
            console.log(photo_id);

            await Photo.findByIdAndDelete(photo_id);
            return res.status(200).json({
                success: true,
                message: 'photo deleted successfully'
            });

        } catch (error) {
            return res.status(500).json({
                message: "error in deleting photo",
                error: error.message
            });

        }
    },

    toggledisable: async (req, res) => {

        try {
            const photo_id = req.body.photo_id;
            const changeto = req.body.changeto;
            await Photo.findByIdAndUpdate(photo_id, { disabled: changeto });
            res.status(200).json({
                success: true,
                message: changeto ? "תמונה הוסתרה בהצלחה" : "תמונה שוחזרה בהצלחה",
            })
        } catch (error) {
            return res.status(500).json({
                message: "error in disable photo",
                error: error.message
            });
        }
    },
    toggle_is_selected: async (req, res) => {
        try {
            const photo_id = req.body.photo_id;
            const changeto = req.body.changeto;

            await Photo.findByIdAndUpdate(photo_id, { is_selected: changeto });

            return res.status(200).json({
                success: true,
                message: 'photo changed successfully',
                is_selected: changeto
            });
        } catch (error) {
            return res.status(500).json({
                message: "error to select photo",
                error: error.message
            })
        }
    }


}