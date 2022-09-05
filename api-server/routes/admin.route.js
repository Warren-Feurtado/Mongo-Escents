const express = require('express');
const router = express();
const upload = require('../middleware/admin-upload.middleware');
const {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    createAdmin,
    deleteAdmin,
    register,
    authenticateAdmin
} = require('../controllers/admin.controller');

router.route('/')
.get(getAllAdmins)
.post(upload.single('photo'), createAdmin);

router.route('/auth')
.post(authenticateAdmin);

router.route('/:id')
.get(getAdminById)
.patch(updateAdmin)
.delete(deleteAdmin);

module.exports = router;