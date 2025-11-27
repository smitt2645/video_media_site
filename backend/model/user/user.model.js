const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        default:"User"
    },
    lastName:{
        type:String,
    },
    fullName:{
        type:String,
        index:true    
    },
    username:{
        type:String,
        required:[true,"username is reqired!"],
        lowercase:true,
        trim:true,
        unique:true,
        index:true // for serching functionality
    },
    password:{
        type:String,
        required:[true,"password is reqired!"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is reqired!"],
        lowercase:true,
        trim:true,
        unique:true,
        index:true // for serching functionality
    },
    avatar:{
        type:String,
        default:"sampleAvatar.png"
    },
    coverImage:{
        type:String,        
        default:"sampleCoverImage.png"
    },
    watchHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }],
    refreshToken:{
        type:String
    },
    accessToken:{
        type:String
    }
},
{timestamps:true});

// we are here using mongoose pre middleware to hash password before save!
userSchema.pre("save",async function(next){
    if(this.isModified("firstName") || this.isModified("lastName")){
        this.fullName = await `${this.firstName} ${this.lastName}`;    
    }

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
});

// here we define vertual method that will not store in DB
// but it will give use the field at the Query time!

userSchema.virtual("virtualField").get(function(){
    console.log("Virtual Field =====>>>>",`${this.firstName} ${this.lastName} ${this.email}`)
    return `${this.firstName} ${this.lastName} ${this.email}`;
});

// here we have user defined method for password compare !
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function(){
const accessTokenjwtSign = await jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    fullName:this.fullName
},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
console.log("accessTokenjwtSign====>>>>",accessTokenjwtSign);
    return accessTokenjwtSign;
};

userSchema.methods.generateRefreshToken = async function(params) {
    const refreshTokenJwtSign = await jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
    console.log("refreshTokenJwtSign=====>>>>>",refreshTokenJwtSign);
    return refreshTokenJwtSign;
}
const User = mongoose.model("User",userSchema);

module.exports = User;