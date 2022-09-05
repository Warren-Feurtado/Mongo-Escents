const express = require('express');
const Brands = require('../models/brand.model');
const upload = require('../middleware/upload.middleware')
const { JSONResponse } = require('../lib/helper');


//ADD A NEW BRAND "C"
exports.addNewBrand = async (req, res) => {
    try {
        if(req.file){
            req.body.logoSrc = req.file.path;
            
        }
        const brand = await Brands.create(req.body);
        JSONResponse.success(res, 'Brand added Successfully.', brand, 201);
    } catch(error) {
        JSONResponse.error(res, "Failure Adding Brand to Database.", error, 500);
    }
};

//GET ALL BRANDS "R"
exports.getAllBrands = async(req, res) => {
    try{
        const brands = await Brands.find();
        JSONResponse.success(res, 'Brands Retreived Successfully.', brands, 200);
    }
    catch (error) {
        JSONResponse.error(res, "Failure retreiving Brands from Database.", error, 500);
    }
};

//GET A Brand BY ID "R"
exports.getBrandById = async (req, res) => {
    try{
        const brand = await Brands.findById({_id: req.params.id});
        JSONResponse.success(res, "Brand retreived Successfully.", brand, 200 );
    } catch(error){
        JSONResponse.error(res, "Failure retreiving this Brand.", error, 500);
    }
};

//EDIT AND UPDATE A Brand "U"
exports.UpdateBrand = async (req, res) => {
    try{
        const brand = await Brands.findByIdAndUpdate({_id: req.params.id}, req.body);
        JSONResponse.success(res, "Brand Updated successfully.", {brand, new: req.body}, 200);
    } catch(error){
        JSONResponse.error(res, "Failure Updating this Brand.", error, 500);
    }
};

//DELETE A Brand "D"
exports.deleteBrand = async (req, res) => {
    try{
        const brand = await Brands.findByIdAndRemove({_id: req.params.id});
        JSONResponse.success(res, "Brand successfully Deleted.", brand, 204);
    } catch(error){
        JSONResponse.error(res, "Error Deleting this Brand.", error, 500);
    }
}