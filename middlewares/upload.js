const multer = require('multer');
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb){
      cb(null,Date.now() + '-' + file.originalname);
    } 
  });

var upload = multer({
    storage: storage,
    fileFilter: function(_req, file, cb){
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = upload;