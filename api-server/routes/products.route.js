const express = require('express');
const router = express();
const upload = require('../middleware/product-upload.middleware')
const {
    getAllProducts,
    addNewProduct,
    getProductById,
    UpdateProduct,
    getMenColognes,
    getWomenPerfumes,
    getUnisexFragrances,
    deleteProduct
 } = require('../controllers/product.controller');

router.route('/')
.get(getAllProducts)
.post(upload.single('imageSrc'), addNewProduct);

router.route('/men-colognes').get(getMenColognes);
router.route('women-perfumes').get(getWomenPerfumes);
router.route('/unisex-fragrances').get(getUnisexFragrances);

router.route('/:id')
.get(getProductById)
.patch(UpdateProduct)
.delete(deleteProduct);

module.exports = router;