const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname +'/../public');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname)
    }
});

const imageFileFilter = (req,file,cb) => {
  //allow file types
  const fileTypes = /jpeg|jpg|png|gif/;
  //check mimetype
  const mimetype = fileTypes.test(file.mimetype);
  //check file extension
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if(mimetype && extname) {
    return cb(null,true)
  }else {
    cb(new Error('Only image files are allowed!'),false);
  }
}
  
const upload = multer({ storage: storage,fileFilter: imageFileFilter })

module.exports = upload;