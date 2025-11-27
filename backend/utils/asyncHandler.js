const asyncHandler = (fn) => async(req,res,next) => {
    try {
        return await fn(req,res,next);
    } catch (error) {
        return res.staus(error.code || 500).json({message:"Internal Server Error",success:false})
    }
};

module.exports = {asyncHandler};