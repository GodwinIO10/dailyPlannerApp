const asyncHandler = require("express-async-handler")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwt_secret_Key = process.env.JWT_KEY
const User = require("../models/userModel")
     

// when the functions interact with mongoose database, a promise is returned, hence "async" is added before the functions

// @description    --> Register new users
// @method & route --> POST /api/users 
// @access         --> Public 
const registerUser = asyncHandler (async (req, res) => {
    const { name, email, password } = req.body

    // Making sure all details are entered
    if (!req.body.name || !req.body.email || !req.body.password){
        res.status(400)
        throw new Error("Please Enter required detail(s)")
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User already exists.")
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt) // password is plain text password from form


    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id : user.id,  // from mongodb database
            name : user.name, // name:name  & name (alone) will work too
            email: user.email,
            password : user.password, // displaying hashed password should never be done in production
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Error occured!")
    }
    
})


// @description    --> Authenticate users
// @method & route --> POST /api/users/login 
// @access         --> Public 
const loginUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body

    // Making sure all datails are filled
    if (!req.body.email || !req.body.password){ 
        res.status(400)
        throw new Error("Please Enter required detail(s)")
    }
 
    // Check if user's email exists in DB
    const user = await User.findOne({ email })

    // if user data exists and form password equals database password
    if (user && (await bcryptjs.compare(password, user.password))) {
        res.json ({
            _id : user.id,  
            name : user.name, 
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Wrong credentials!")
    }

})


// @description    --> Get user data
// @method & route --> GET /api/users/me  (currently logged in user)
// @access         --> Private
const getMe = asyncHandler (async (req, res) => {
/* const { _id, name, email } = await User.findById(req.user.id) 
    res.status(200).json({ id: _id, name, email, })  */  // include the 2 lines if protected middleware route isn't set

    res.status(200).json(req.user) // Since req.user has been gotten from token. See authMiddleware.
})


// Generate JWT
const generateToken = (id) => {

    return jwt.sign({ id }, jwt_secret_Key, {
        expiresIn: 180 // ie token expires 180 seconds
    })
}



module.exports = { 
    registerUser,
    loginUser,
    getMe,
}