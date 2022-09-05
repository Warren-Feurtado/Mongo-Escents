const express = require('express');
const router = express.Router();
const {
    getCartItems,
    addCartItem,
    deleteCartItem,
    clearCart
} = require('../controllers/cart.controller');


router.route('/')
.get(getCartItems)
.post(addCartItem)

router.route('/delete').delete(clearCart);

router.route('/:id').delete(deleteCartItem);


module.exports = router;
