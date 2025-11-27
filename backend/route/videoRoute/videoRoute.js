const route = require("express").Router();
const multer = require("../../middleware/multer.middleware");
const {uploadVideo, getChannelVideos} = require("../../controller/video/video.controller");
const { verifyJwt } = require("../../middleware/auth.middleware");

route.post("/upload",verifyJwt,multer.fields([{name:"video",maxCount:1},{name:"thumbNail",maxCount:1}]),uploadVideo);
route.get("/get-channel-videos/:id",verifyJwt,getChannelVideos);

module.exports = route;