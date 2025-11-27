const User = require("../../model/user/user.model");
const Video = require("../../model/video/video.model");

const handOnPractice = async (req,res) => {
    try {
        const search = req.query.search;
        console.log("search",search.replace(/\s+/g, '').toLowerCase())
        const getUsers = await Video.find({title:{$regex:search.replace(/\s+/g, '').toLowerCase()}});
    console.log("Come here !")        
    // console.log("getUsers:",getUsers)
        return res.status(200).json({message:"",status:"Ok",success:true,data:getUsers});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Serve Error",error});
    }
} 

const findOneAndUpdateDeleteReplace = async (req,res) => {
    try {
        const id = req.params.id;
        const videoManipulation = await Video.findOneAndUpdate({title:"video1"},{$set:{title:"new title 5",description:"this is the video with title 5 "}},{new:true,upsert:true,projection:{title:1,description:1}})
        // const videoManipulation = await Video.findByIdAndDelete({title:"video1"},{$set:{title:"new title 5",description:"this is the video with title 5 "}},{new:true,upsert:true,projection:{title:1,description:1}})
        // const videoManipulation = await Video.findOneAndReplace({title:"video1"},{$set:{title:"new title 5",description:"this is the video with title 5 "}},{new:true,upsert:true,projection:{title:1,description:1}})
     
        return res.status(200).json({message:"Query Run SucessFully !",data:videoManipulation});
        
    } catch (error) {
        console.log("error",error)
        return res.status(500).json({message:"Internal Serve Error",error});
        
        }
}   
module.exports = {handOnPractice,findOneAndUpdateDeleteReplace};