const User = require('../models/User');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


module.exports = {
    login_user : async(req, res)=>{ // log in exiting user
        try {
            // get values from request body
            const {
                user_email,
                user_password
            } = req.body;

            // values from request body validation
            if (!user_email || !user_password) {
                throw new Error('all fields are required');
            }

            // try to find user in DB with user_email
            const user = await User.findOne({ user_email });

            // in case no exist user
            if (!user) {
                throw new Error('Wrong username / password!');
            }

            // true or false 
            const is_match = await bcrypt.compare(user_password, user.user_password);


            // check if password correct
            if (!is_match) {
                throw new Error('Wrong username / password!');
            }

            //user login success

            let payload = {
                user: user._id,
            };

            const token = await jwt.sign(payload,process.env.SECRET_KEY, {expiresIn : '3d'});

            res.cookie("token",token,{maxAge: 259200000});

            return res.status(201).json({
                success: true,
                message: "user login seccessfully",
                token,
                user_id: user._id
            });

        } catch (error) {
            return res.status(401).json({
                message: "error in login user request",
                error: error.message
            })
        }


    },
    get_all_users : async(req,res)=>{ // בקשה לשרת להחזרת כל האירועים
        try {
            const users = await User.find();
            return res.json({
                users
            });

        } catch (error) {
            return res.status(500).json({
                message: "cannot get users",
                error: error.message
            });  
        }

    },
    get_user_by_id : async(req,res)=>{ // get user by id
        try {
            const user = await User.findById(req.params.user_id);
            return res.json({
                user
            });
            
        } catch (error) {
            return res.status(500).json({
                message: "cannot get user by id",
                error: error.message
            });  
        }
    },
    create_user : async(req,res)=>{ // create new user

            const {
                user_name,
                user_email,
                user_password
            } = req.body;

            if(user_name == null || user_email == null || user_password == null){
                throw new Error('Please complete all the fields!');
            }
            if(!user_name || ! user_email || ! user_password){
                throw new Error('Please complete all the fields!');
            }
            const new_user = new User({
                user_name,
                user_email,
               user_password
            });

            await new_user.save();

            return res.status(200).json({
                success: true,
                message: 'add new user successfully',
                new_user
            });

    
    },
    delete_user : async(req, res) => { // delete user by id
        try {
            const user = await User.findByIdAndDelete(req.params.user_id);
            return res.json({
                user
            });
        } catch (error) {
            return res.status(500).json({
                message: "cannot delete user by id",
                error: error.message
            });  
        }
    
    },
    auth: async (req, res) => {
    
        try {
            const token = req.headers["authorization"];
      
            if (!token) {
              throw new Error("no token provided");
            }
      
            const decode = jwt.verify(token, process.env.SECRET_KEY);      
            const user = await User.findById(decode.user).exec();
      
            if (!user) {
              throw new Error("access denided");
            }
      
            return res.status(201).json({
              success: true,
              message: "user authoraized",
              token,
              user: {
                _id:user._id,
                user_name: user.user_name,
                user_email:user.user_email,
              },
            });
          } catch (error) {
            return res.status(401).json({
              message: "unauthoraized",
              error: error.message,
            });
          }

    },
    client_login : async (req,res)=>{
        try {
            // get values from request body
            const {
                user_password,
                event_id
            } = req.body;

            // values from request body validation
            if (!user_password) {
                throw new Error('אנא הכנס סיסמה');
            }

            const event = await Event.findById(event_id);
            const is_match = user_password === event.event_password;
            // check if password correct
            if (!is_match) {
                throw new Error('סיסמה שגויה!');
            }

            //user login success

            let payload = {
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
    client_auth : async (req,res)=>{
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
              token,
              pass: {
                pass:event_password
              },
            });
          } catch (error) {
            return res.status(401).json({
              message: "unauthoraized",
              error: error.message,
            });
          }    
    }
}