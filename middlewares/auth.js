const jwt = require('jsonwebtoken');
const User = require('../models/User');


module.exports = async (req, res, next) => {
  if (req.cookies) {
    const token = req.headers.authorization;

    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decode.user);

      if (!user) {
        return res.status(401).json({ success: false, message: 'unauthorized access!' });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'unauthorized access!' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'sesson expired try sign in!',
        });
      }

      res.res.status(401).json({ success: false, message: 'Internal server error!' });
    }
  } else {
    res.status(401).json({ success: false, message: 'unauthorized access!' });
  }
};
