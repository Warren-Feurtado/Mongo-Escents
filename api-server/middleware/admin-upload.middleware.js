const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/admin-photos')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.split(ext)[0] + Date.now() + ext);
    }
});

let upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 20
    }
});

module.exports = upload;