const productModel = require("../../model/product/productModel");

const createProduct = async (req,res) =>{
    try {
        console.log("req",req.body)
        const products = req.body || [];
        console.log("products:",products)
        if(!Array.isArray(products) || products.length === 0){
            return res.status(403).json({message:"No product Found !",status:false});
        }

        const product = await productModel.insertMany(products);
        console.log("product:",product)
        return res.status(200).json({message:"Product created successfully !",status:true,data:product,length:product?.length})
    } catch (error) {
        return res.status(500).json({message:"Server error !",status:false,error});
    }
}


const updateProduct = async (req,res) => {
    try {
        console.log("req.params.id:",req.params.id)
   
        console.log("req.body",req.body)
        const findProduct = await productModel.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        console.log("findProduct:",findProduct)
        return res.status(200).json({message:"product updated successfully !",status:true,data:upadteProduct});
        
    } catch (error) {
        return res.status(500).json({message:" product updation failed !",error});
    }
}


const deleteProduct = async (req,res) => {
    try {
        console.log("req.params.id:",req.params.id)
   
        console.log("req.body",req.body)
        const findProduct = await productModel.findByIdAndDelete(req.params.id);
        console.log("findProduct:",findProduct)
        return res.status(200).json({message:"product deleted successfully !",status:true,data:upadteProduct});
        
    } catch (error) {
        return res.status(500).json({message:" products deletion failed !",error});
    }
}


const getAllProducts = async (req,res) => {
    try {
        const findAllProducts = await productModel.find();
        return res.status(200).json({message:"All products fetched successfully !",status:true,data:findAllProducts});
        
    } catch (error) {
        return res.status(500).json({message:"All products fetched successfully !",error});
    }
}

module.exports = {createProduct,updateProduct,deleteProduct,getAllProducts};