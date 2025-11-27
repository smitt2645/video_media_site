const User = require("../model/user/user.model");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = asyncHandler(async(req,res,next)=>{
    console.log("hitting the middleware !");
    next()
});

const verifyJwt = asyncHandler(async(req,res,next)=>{
try {
        // console.log("req:",req)
        console.log("server log ",req.cookies.accToken)
        const accToken = req.cookies.accToken;
        const refToken = req.cookies.accToken;
        console.log("req.cookies.accToken:",req.cookies.accToken)
            const verifyAccJwt = jwt.verify(req.cookies.accToken,process.env.ACCESS_TOKEN_SECRET);
            console.log("verifyAccJwt:",verifyAccJwt)
            const findUser = await User.findById(verifyAccJwt._id);
            if(findUser){
                req.user =  findUser;
                return next();
            }
            
        } catch (error) {
            // res.status(302).json({message:"Session Expired"})
    try {
        const verifyRefJwt = jwt.verify(req.cookies.refreshToken,process.env.REFRESH_TOKEN_SECRET);
        console.log("verifyRefJwt::::",verifyRefJwt);
        const findUser = await User.findById(verifyRefJwt._id);
        if(findUser.refreshToken == req.cookies.refreshToken){
            const accessToken = await findUser.generateAccessToken();
            findUser.accessToken = accessToken;
            await findUser.save()
            const option = {
                httpOnly:true,
                secure:true
            }
             res.status(200).cookie("accToken",accessToken,option)     
            req.user = findUser;
            req.customMessage = "AccessToken regenerate Successfully !";
            res.status(200).json({message:"AccessToken Regenerated SucessFully !"}).cookies("accToken",accessToken,option);
            return next()
        }

        console.log("findUser::::::",findUser)
        // return next()
    } catch (error) {
        console.log(error);
    }
    console.log("error:",error);
    
}   
});

module.exports = {authenticateUser,verifyJwt};