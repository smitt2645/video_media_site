const cloudinary =  require("cloudinary").v2;
require("dotenv").config();

// const image = require("../public")
const fs = require("fs");
cloudinary.config({
    cloud_name:process.env.COULDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});
// const image = "./public/istockphoto-1973365581-612x612.jpg"
async function ImageUpload(Image){
    console.log("Image:",Image)
    console.log("comes???",Image);
    try {
        
        const res = await cloudinary.uploader.upload(Image,{resource_type:"auto"});
        console.log("res:",res);
        return res
    } catch (error) {
        console.log(error)
    }
    // const upload = await cloudinary.uploader.upload(Image).then((res)=>{
    //     console.log("Image uploaded succssfully : res ::",res);
    //     fs.unlinkSync(Image,function(err){
    //         if(err){
    //             console.log("Got an error in FS.FileUnlinkSync")
    //         }else{
    //             console.log("res:",res)
    //             console.log("Image Deleted From the Server Because Image uploaded succssfully!")
    //             return res;
    //         }
    //     });
    // }).catch((err)=>{
    //     console.log("Cloudinary image uploadation failed!",err);
    // });
}

module.exports = {ImageUpload};