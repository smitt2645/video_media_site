const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxLength:[6,"max length 6 exceed"]
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    image:[
        {
            image_id:{
                type:String,
                required:[true,"Product image required"]
            },
            image_url:{
                type:String,
                required:[true,"Product iamge is required field"]
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please enter product category"]
    },
    stock:{
        type:String,
        required:[true,"please enter stock"],
        maxLength:[4,"can not exceed 4 char "]
    },
    review:[
        {
            name:{
                type:String,
            },
            comment:{
                type:String,
            },
            rating:{
                type:String,
                default:0
            }
        }
    ],
    numOfreview:{
        type:Number,
        default:0
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Product",productSchema);