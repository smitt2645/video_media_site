const mongoose = require("mongoose");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

const videoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        default:null
        // required:true
    },
    videoFile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    view:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    channel_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subscription",
        require:true
    },
    likes:{
        type:Number,
        default:0
    },
    share:{
        type:Number,
        default:0
    },
    comments:[{
        text:{
            type:String,
        },
        commentedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }],

},
{timestamps:true});

videoSchema.plugin(mongooseAggregatePaginate);

const video = mongoose.model("Video",videoSchema);

module.exports = video;