const User = require("../model/user/user.model");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {sendEmail} = require("../utils/sendEmail");
const {ImageUpload} = require("../utils/fileUploadOnCloudinary");
const registerUser = asyncHandler(async (req,res)=>{
  try {
      const {username,email,password,firstName,lastName} = req.body;
      // console.log("req:",req)
      console.log("username,email,password:",username,email,password)
      if(!username || !email || !password){
          return res.status(404).json({message:"username email or password something missing"});
      };
      
      const findRgstUser = await User.findOne({
          $or:[{email},{username}]
      });
      
      if(findRgstUser){
          return res.status(409).json({message:"User already Registed !"});
      }
      
      console.log("findRgstUser:",findRgstUser)
      let coverImage;
      let avatarImage;
      if(req.files){
           coverImage = await ImageUpload(req.files.coverImage[0].path);
           avatarImage = await ImageUpload(req.files.avatar[0].path);  
  
      }
        console.log("avatarImage",avatarImage)
        console.log("coverImage",coverImage)
      // console.log("req.files:",req.files.avatar[0].filename)
      
      const userCreation = await User.create({
        firstName,
        lastName,
          username,
          email,
          password,
          coverImage:coverImage?.secure_url || "",
          avatar:avatarImage?.secure_url || ""
      });
  
      const user = await User.findById(userCreation._id).select(" -password -refreshToken -accessToken");
      console.log("user:",user)
      if(user){
          return res.status(200).json({message:"User registerd successfully",success:true,data:user});
      }else{
          return res.status(200).json({message:"User registerd Failed",success:false,data:null});
      }
     
      // sendEmail();
  } catch (error) {
    console.log("error:",error)
  }
});

const loginUser = asyncHandler(async (req,res)=>{
    const {username , password} = req.body;
    if(!username || !password){
        return res.status(309).json({message:"Username or password is missing !",success:false})
    }
    
    const user = await User.findOne({
        $or:[{username},{password}]
    })
    
    if(!user){
        return res.status(404).json({message:"User not Found , Please Registered yourself !",success:false})
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    
    if(!isPasswordCorrect){
        return res.status(304).json({message:"Incorrect Password !",success:false})
    }

    const generateAccessToken = await user.generateAccessToken();
    const generateRefreshToken = await user.generateRefreshToken();

    if(!generateAccessToken){
      return res.status(302).json({message:"Failed to generate Access Token",success:false})  
    }
    else{
        user.accessToken = generateAccessToken;
        user.refreshToken = generateRefreshToken;
        await user.save();
        console.log("generateAccessToken:",generateAccessToken)
    }
    if(!generateRefreshToken){
        return res.status(302).json({message:"Failed to generate Refresh Token",success:false})  
    }else{
        await user.save();
        console.log("generateRefreshToken:",generateRefreshToken)
    }

    const findUser = await User.findById(user._id); 

    const options = {
        httpOnly:true,
        secure:true
    }
    
    return res.status(200).cookie("accToken",generateAccessToken,options).cookie("refreshToken",generateRefreshToken,options).json({message:"User login successFully !",status:"Ok",success:true,data:{user: findUser || null ,generateRefreshToken,generateAccessToken}} );
});

const logoutUser = asyncHandler(async(req,res)=>{
try {
        console.log("req.user:",req.user)
        // const user = await User.findById(req.user._id)``;
        const findUser = await User.findById(req.user._id);
        console.log("user find:",findUser)
        findUser.accessToken = undefined;
        await findUser.save();
        console.log("comes??")
        // const logoutUser = await User.updateOne({_id:req.user._id},{$set:{accessToken:undefined}});
    
        const options = {
            httpOnly:true,
            secure:true
        }
    
        return res.status(202).clearCookie("accToken",options).clearCookie("refreshToken",options).json({message:"User logout successFully !",status:"Ok",success:true,data:findUser});
} catch (error) {
    console.log("eroor:",error)
}
});

const refreshAccessToken = async (req,res) =>{
    try {
        console.log("req.cookies:",req.cookies)
        console.log("req:",req.headers.cookie)
        const refToken = req.cookies.refreshToken;
        console.log("refToken:",refToken)
    
        const verifyRefToken = jwt.verify(refToken,process.env.REFRESH_TOKEN_SECRET) 
        console.log("verifyRefToken:",verifyRefToken);
        if(!verifyRefToken){
            return res.status(404).json({message:"Token Expire !",success:false,status:undefined});
        };
        const user = await User.findById(verifyRefToken._id);
        const accessToken = await user.generateAccessToken();
        user.accessToken = accessToken;
        await user.save()
        const option = {
            httpOnly:true,
            secure:true
        }
        return res.status(200).cookie("accToken",accessToken,option).json({message:"AccessToken Generation successfully !",status:"Ok",success:true,customMessage:req.customMessage});     
    } catch (error) {
        console.log("error:",error);
    }
}
const getUsers = asyncHandler(async(req,res)=>{
    const findallUser = await User.find();
   return  res.status(200).json({message:"fetched all users successfully ",data:findallUser})
})
const getUser = asyncHandler(async(req,res)=>{
    const id = req.user._id;
    console.log("id::::",id)
    const findUser = await User.findById(id).select("-refreshToken -accessToken -password");
   return  res.status(200).json({message:"User's profile fetch successfully ",data:findUser,customMessage:req.customMessage})
})
module.exports = {registerUser,loginUser,logoutUser,refreshAccessToken,getUsers,getUser};