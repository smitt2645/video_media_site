const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // load .env

const connectMongoDb = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_DB);
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connectMongoDb;
