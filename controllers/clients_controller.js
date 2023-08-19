const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

module.exports = {
    login_client : async (req,res)=>{
        try {
            // get values from request body
            const {
                user_password,
                event_id
            } = req.body;

            console.log(event_id ,user_password);
    
            // values from request body validation
            if (!user_password) {
                throw new Error('אנא הכנס סיסמה');
            }
    
            const event = await Event.findById(event_id);
            console.log(event);
            const is_match = user_password === event.event_password;
            // check if password correct
            if (!is_match) {
                throw new Error('סיסמה שגויה!');
            }
    
            //user login success
            let payload = {
                event_id:event.event_id,
                event_password:event.event_password
            };
    
            const token = await jwt.sign(payload,process.env.SECRET_KEY, {expiresIn : '3d'});
    
            res.cookie("token",token,{maxAge: 259200000});
    
            return res.status(201).json({
                success: true,
                message: "Successfully login to album :)",
                token
            });
    
        } catch (error) {
            return res.status(401).json({
                message: "error in login user request",
                error: error.message
            })
        }
    
    
    },
    auth_client : async (req,res)=>{
        try {
            const token = req.headers["authorization"];
      
            if (!token) {
              throw new Error("no token provided");
            }
      
            const decode = jwt.verify(token, process.env.SECRET_KEY);      
            const pass = await (decode.event_password).exec();
      
            if (!pass) {
              throw new Error("access denided");
            }
      
            return res.status(201).json({
              success: true,
              message: "user authoraized",
              token
            });
          } catch (error) {
            return res.status(401).json({
              message: "unauthoraized",
              error: error.message,
            });
          }    
    }
    
}
