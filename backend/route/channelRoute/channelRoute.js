const route = require("express").Router();
const {createChannel,getUserChannel, subscribeChannel} = require("../../controller/channel.controller")
const {verifyJwt} = require("../../middleware/auth.middleware");

route.post("/create",verifyJwt,createChannel);
route.get("/get-channel/:username",verifyJwt,getUserChannel);
route.post("/subscribe-channel/:id",verifyJwt,subscribeChannel);

module.exports = route;