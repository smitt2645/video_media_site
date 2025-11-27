const router = require("express");
const { registerUser, loginUser, logoutUser, refreshAccessToke, refreshAccessToken ,getUsers, getUser} = require("../../controller/user.controller");
const { authenticateUser, verifyJwt } = require("../../middleware/auth.middleware");
const upload = require("../../middleware/multer.middleware");
const route = router.Router();

route.post("/register",upload.fields([{name:"avatar",maxCount:1},{name:"coverImage",maxCount:1}]),registerUser);
route.post("/login",loginUser) ;
route.post("/logout",verifyJwt,logoutUser) ;
route.post("/refresh-access-token",refreshAccessToken) ;
route.get("/get-user",verifyJwt,getUsers);
route.get("/get-profile",verifyJwt,getUser);
module.exports = route;