const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/brand-logo');
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, file.originalname.split(ext)[0] + Date.now() + ext);
    }
});

let upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 20
    },

    // ---- FOR SPECIFYING THE TYPE OF DOCUMENT TO BE UPLOADED ---- //
    // fileFilter: (req, file, callback) => {
    //     if(file.mimetype == 'images/jpg'){
    //         callback(null, true)
    //     } else{
    //         console.log('Unsupported File');
    //         callback(null, false)
    //     }
    // }
});

module.exports = upload;