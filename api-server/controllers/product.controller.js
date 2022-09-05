const express = require('express');
const Products = require('../models/product.model');
const upload = require('../middleware/product-upload.middleware');
const { JSONResponse } = require('../lib/helper');
// const db = require('mongoose');

//ADD A NEW PRODUCT "C"
exports.addNewProduct = async (req, res) => {
    try {
        if(req.file){
            req.body.imageSrc = req.file.path;
        }
        const product = await Products.create(req.body);
        JSONResponse.success(res, 'Product added Successfully.', product, 201);
    } catch(error) {
        JSONResponse.error(res, "Failure Adding Product to Database.", error, 500);
    }
};

//GET ALL PRODUCTS "R"
exports.getAllProducts = async(req, res) => {
    try{
        const products = await Products.aggregate([{
            $lookup: {
                from: "brands",
                localField: "brand",
                foreignField: "_id",
                as: "product_brand"
                }
            },
        ]);
        console.log(products);
        JSONResponse.success(res, 'Products Retreived Successfully.', products, 200);
    } catch(error) {
        JSONResponse.error(res, "Failure retreiving Products from Database.", error, 500);
    }
};

//GET A PRODUCT BY ID "R"
exports.getProductById = async (req, res) => {
    try{
        
        const product = await Products.findById({_id: req.params.id}).populate('brand');
        JSONResponse.success(res, "Product retreived Successfully.", product, 200 );
    } catch(error){
        JSONResponse.error(res, "Failure retreiving this Product.", error, 500);
    }
};

//GET MEN'S COLOGNES
exports.getMenColognes = async (req, res) => {
    try{
        let colognes = await Products.find({
            $where: function(){
                return this.gender === "Men";
            },
        });
        JSONResponse.success(res, "Colognes retreived Successfully.", colognes, 200 );
    } catch(error){
        JSONResponse.error(res, "Failure retreiving colognes.", error, 500);
    }
}

//GET WOMEN'S PERFUMES
exports.getWomenPerfumes = async (req, res) => {
    try{
        let perfumes = await Products.find({
            $where: function(){
                return this.gender === "Women";
            },
        });
        JSONResponse.success(res, "Perfumes retreived Successfully.", perfumes, 200 );
    } catch(error){
        JSONResponse.error(res, "Failure retreiving this Perfumes.", error, 500);
    }
}

//GET UNISEX FRAGRANCES
exports.getUnisexFragrances = async (req, res) => {
    try{
        let unisex = await Products.find({
            $where: function(){
                return this.gender === "Unisex";
            },
        });
        JSONResponse.success(res, "Fragrances retreived Successfully.", unisex, 200 );
    } catch(error){
        JSONResponse.error(res, "Failure retreiving Fragrances.", error, 500);
    }
}

//EDIT AND UPDATE A PRODUCT "U"
exports.UpdateProduct = async (req, res) => {
    try{
        const product = await Products.findByIdAndUpdate({_id: req.params.id}, req.body);
        JSONResponse.success(res, "Product Updated successfully.", {product, new: req.body}, 200);
    } catch(error){
        JSONResponse.error(res, "Failure Updating this Product.", error, 500);
    }
};

//DELETE A PRODUCT "D"
exports.deleteProduct = async (req, res) => {
    try{
        const product = await Products.findByIdAndRemove({_id: req.params.id});
        JSONResponse.success(res, "Product successfully Deleted.", product, 204);
    } catch(error){
        JSONResponse.error(res, "Error Deleting this Product.", error, 500);
    }
}