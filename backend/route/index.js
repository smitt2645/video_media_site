// here we are configuring main Route File (whole app route iwll be accessable from here !)

const express =  require("express");
const productRoute = require("./productRoute/productRoute");
const userRoute = require("./userRoute/userRoute");
const channelRoute = require("./channelRoute/channelRoute");
const videoRoute = require("./videoRoute/videoRoute");
const practiceRoute = require("./practiceRoute/practiceRoute");
const route = express.Router();
// product Route !
route.use("/v1/product",productRoute);
// user Route !
route.use("/v1/user",userRoute);
// channel Route !
route.use("/v1/channel",channelRoute);
// video Route !
route.use("/v1/video",videoRoute);
// practice Route !
route.use("/v1/practice",practiceRoute);

module.exports = route;