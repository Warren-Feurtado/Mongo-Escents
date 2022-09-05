const express = require('express');
const router = express();
const upload = require('../middleware/upload.middleware')
const {
    getAllBrands,
    addNewBrand,
    getBrandById,
    UpdateBrand,
    deleteBrand
 } = require('../controllers/brand.controller');

router.route('/')
.get(getAllBrands)
.post(upload.single('logoSrc'), addNewBrand);

router.route('/:id')
.get(getBrandById)
.patch(UpdateBrand)
.delete(deleteBrand);

module.exports = router;