
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    channelName:{
        type:String,
        require:true,
        index:true,
        unique:true,
    },
    subscribing:[{
        subscribing_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            // unique:true
        }
    }],
    subscriber:[{
        subscriber_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            // unique:true
        }
    }],
    channelOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
},{
    timestamps:true
});

const Subscription = mongoose.model("Subscription",subscriptionSchema);

module.exports = Subscription;