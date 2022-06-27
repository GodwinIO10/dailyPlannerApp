const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const jwt_secret_Key = process.env.JWT_KEY
const User = require("../models/userModel")


const protect = asyncHandler( async(req, res, next) => {
    let token // initializing the variable token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1] // 1 index of array created using .split method is the token
        
            // Verify token
            const decoded = jwt.verify(token, jwt_secret_Key)
            
            // Get user from token
            req.user = await User.findById(decoded.id).select("-password")
            
            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not Authorized")   
        }
    }

    if(!token) {
        res.status(401)
        throw new Error("Not Authorized, no token")
    }
})


module.exports = { protect }