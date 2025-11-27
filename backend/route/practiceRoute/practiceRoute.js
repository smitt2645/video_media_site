const express = require("express")
const  {handOnPractice, findOneAndUpdateDeleteReplace} = require("../../controller/practice/practice.cotroller");
const route =  express.Router();

route.get("/get",handOnPractice);
route.get("/findone-and-update-delete-replace/:id",findOneAndUpdateDeleteReplace);

module.exports = route;