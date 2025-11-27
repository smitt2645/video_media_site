const mongoose = require('mongoose');
const { asyncHandler } = require("../../utils/asyncHandler");
const {ImageUpload} = require("../../utils/fileUploadOnCloudinary");
const Video = require("../../model/video/video.model");
const Subscription = require("../../model/subscription/subscription.model");
const User = require("../../model/user/user.model");
const uploadVideo = asyncHandler(async(req,res)=>{
    try {
        const {title,description} = req.body ;
        if(title?.trim("") === ""){
            return res.status(404).json({message:"Invalid video title !",status:undefined,success:false});
        }
        console.log("req.user:",req.user)
        console.log("req.files:",req.files)
        console.log("req file:",req.files.video[0].path);
        console.log("req thumbnail:",req.files.thumbNail[0].path);
        const videoURL = await ImageUpload(req.files.video[0].path);
            
        const thumbnail = await ImageUpload(req.files.thumbNail[0].path);
        console.log("videoURL:",videoURL.secure_url);
        console.log("videoURL.asset_id:",videoURL.asset_id);
        console.log("videoURL.duration:",videoURL.duration);
        if(!videoURL?.secure_url || !thumbnail?.secure_url){
            return res.status(404).json({message:"Video or thumbnail Uploadation Failed !",status:undefined,success:false});
        }
        const findChannel = await Subscription.findOne({channelOwner:req.user._id});
        console.log("findChannel:",findChannel)
        if(!findChannel){
            return res.status(404).json({message:"UnAuthorized Channel !",status:undefined,success:false});
        }

        const video = await Video.create({
            title:title,
            description:description || null,
            videoFile: videoURL?.secure_url || "",
            thumbnail:thumbnail?.secure_url || "",
            duration:videoURL?.duration,
            channel_id:findChannel._id 
        })
        if(!video){
            return res.status(404).json({message:"video saved failed !",status:undefined,success:false});
        }
        return res.status(200).json({message:"Video Saved Successfully !",status:"Ok",success:true,data:video});
    } catch (error) {
        console.log("error:",error)
    }   
}); 

const getChannelVideos = asyncHandler(async(req,res)=>{
    console.log("req.user:",req.user._id) ;
    const findUser = await User.findById(req.user._id);
    const channel_id = req.params.id;
    if(!findUser){
        return res.status(309).json({message:"Authorization failed",success:false});
    };

    const findChannelVideos = await Video.aggregate([
        {$match:{channel_id: new mongoose.Types.ObjectId(channel_id)}},
        {$lookup:{
            from:"subscriptions",
            localField:"channel_id",
            foreignField:"_id",
            as:"channel",
            pipeline:[
                {$lookup:{
                    from:"users",
                    localField:"channelOwner",
                    foreignField:"_id",
                    as:"uploadedBy",
                }}
            ]
        }}
    ]);
    console.log("findChannelVideos:",findChannelVideos)
    if(!findChannelVideos){
        return res.status(404).json({message:"No Videos Found!"});
    }
    
    return res.status(200).json({message:"Channel's All Video Fetched Successfully !",data:findChannelVideos});
});
module.exports = {uploadVideo,getChannelVideos};