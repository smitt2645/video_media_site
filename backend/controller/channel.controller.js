const Subscription = require("../model/subscription/subscription.model");
const User = require("../model/user/user.model");
const { asyncHandler } = require("../utils/asyncHandler");

const createChannel = asyncHandler(async (req,res)=>{
try {
        const {title,user_id} = req.body;
        console.log("req:",req.user._id)
        if(!title || !req.user._id){
            return res.status(309).json({message:"Title or User something missing!"});
        };
        
        if(title.trim("") === ""){
            return res.status(303).json({message:"Channel name can't be empty !"});
        };
        const channelAlredyExist = await Subscription.findOne({channelOwner:req.user._id});
        if(channelAlredyExist){
            return res.status(309).json({message:"This user's channel is already exist !"});
        }
        const createChannel = await Subscription.create({
            channelName:title,
            channelOwner:req.user._id
        });
        
        if(!createChannel){
            return res.status(303).json({message:"error while creating your channel!",error:createChannel});
        }
        
        return res.status(200).json({message:"Your channel created Successfully !",data:createChannel});
    
} catch (error) {
    console.log("error:",error)
}});

const getUserChannel = asyncHandler(async (req,res)=>{
    // console.log("req::",req.user);
const {username} = req.params;
    console.log("req.params.username:",req.params.username)
console.log("username:",username)

const findChannel = await User.aggregate([
    {
        $match:{username:username}
    },
    {
        $lookup:{
            from:"subscriptions",
            localField:"_id",
            foreignField:"channelOwner",
            as:"channel"
        }
    }]);
    console.log("findChannel:",findChannel);
    if(!findChannel){
        return res.status(404).json({message:"Channel not found !"});
    }
    
    return res.status(200).json({message:"Channel Find successfully !",data:findChannel})
    
});

const subscribeChannel = asyncHandler(async(req,res)=>{
    // const {} = req.body;
    try {
        const {id} = req.params;
        const subscriber = req.user._id
        const findChannel = await Subscription.findById(id);
    
        console.log("findChannel:",findChannel);
        console.log("subscriber,findChannel:",subscriber,findChannel)
        if(!findChannel || !subscriber){
            res.status(404).json({message:"Channel or subscriber not Found!"});
        }
        
        const myChannel = await Subscription.findOne({channelOwner:req.user.id});

        if(!myChannel){
            return res.status(200).json({message:"Not found !"});
        }

        const alreadySubscribed = findChannel.subscriber && findChannel.subscriber.some((subs)=>{ 
            console.log("subs?.subscriber_id.toString() === subscriber.toString()",subs?.subscriber_id.toString() === subscriber.toString())
            return subs?.subscriber_id.toString() === subscriber.toString();  
        });

        if(alreadySubscribed){
            return res.status(200).json({message:"Already subscribed !"});
        }

        myChannel.subscribing.push({subscribing_id:findChannel.channelOwner});
        await myChannel.save()

        
        console.log("findChannel?.subscriber:",findChannel?.subscriber)
        console.log(!findChannel?.subscriber?.includes({subscriber_id:subscriber}))
        const alreadyExist = findChannel.subscriber && findChannel.subscriber.some((subs)=>{ 
            console.log("subs?.subscriber_id.toString() === subscriber.toString()",subs?.subscriber_id.toString() === subscriber.toString())
            return subs?.subscriber_id.toString() === subscriber.toString();  
        });
            console.log("alreadyExist:",alreadyExist)
        if(alreadyExist){
           return res.status(200).json({message:"You are already subscribed this channel !"});
        }
        findChannel.subscriber.push({subscriber_id:subscriber})
        
        await findChannel.save();
       
         
        return res.status(200).json({message:"Channel Subscribed Successfully !",});
    } catch (error) {
        console.log("error:",error)
    }
});

const createSubscribing = asyncHandler(async(req,res)=>{
    // const {} = req.body;
    try {
        const {id} = req.params;
        const subscribing = req.user.id
        const findChannel = await Subscription.findById(id);
        
        if(!findChannel){
            return res.status(200).json({message:"Channel not exist !",});
        }
        
        return res.status(200).json({message:"Channel Subscribed Successfully !",});
    } catch (error) {
        console.log("error:",error)
    }
});

module.exports = {createChannel,getUserChannel,subscribeChannel,createSubscribing};