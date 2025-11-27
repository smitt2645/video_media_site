const express = require("express");
const app =  require("./app");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// using cookie parser we can do CRUD on client browser !
const cors = require("cors");
const mainRouter = require("./route/index");
const errorMiddleware = require("./middleware/error");
const connectMongoDB = require("./db/connectMongoDb");
const { ImageUpload } = require("./utils/fileUploadOnCloudinary");
const { verifyJwt } = require("./middleware/auth.middleware");
dotenv.config({
    path:"./.env"
});

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
const Port = process.env.PORT || 8009;

// here we are serving the FE build in static!
// app.use(express.static("dist"));
// all route will be accessable from this mainRouter !
app.use("/api",mainRouter);

app.use(express.static("public"));
// ImageUpload()
app.use(errorMiddleware);
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(cookieParser());

connectMongoDB().then(()=>{
    app.listen(Port,()=>{
        console.log(`your server listening on http://localhost:${Port}`)
    });
});
