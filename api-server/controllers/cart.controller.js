const { JSONResponse } = require('../lib/helper');
const Cart = require('../models/cart.model');

//GET CART ITEMS
exports.getCartItems = async (req, res, next) => {
    try{
        // let cart = await Cart.find();
        const cart = await Cart.aggregate([{
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "cart_item"
                }
            },
        ]);
        JSONResponse.success(res, 'Cart Items Retreived Successfully.', cart, 200);
    } catch(error){
        JSONResponse.error(res, "Failure retreiving cart items from Database.", error, 500);
    }
};

//ADD items to cart
exports.addCartItem = async (req, res, next) => {
    try{
        let cart = await Cart.create(req.body);
        JSONResponse.success(res, 'Cart Item added Successfully.', cart, 201);
    } catch(error){
        JSONResponse.error(res, "Failure Adding Product to Database.", error, 500);

    }
};

//DELETE A CART ITEM
exports.deleteCartItem = async (req, res, next) => {
    try{
        let cart = await Cart.findOneAndDelete(req.params.id);
        JSONResponse.success(res, 'Cart Item deleted Successfully.', cart, 201);
    } catch(error) {
        JSONResponse.error(res, "Failure deleting Cart Item from Database.", error, 500);
    }
};

//DELETE ALL ITEMS FROM CART
exports.clearCart = async (req, res, next) => {
    try{
        let cart = await Cart.deleteMany();
        JSONResponse.success(res, 'Cart Cleared Successfully.', cart, 201);
    } catch(error) {
        JSONResponse.error(res, "Failure Clearing Cart.", error, 500);
    }
};
