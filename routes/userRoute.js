const express = require("express")
const router = express.Router()
const { registerUser, loginUser, getMe } = require("../controllers/userController")

// router.get("/", registerUser) // This should be a protected route. For example an Admin role / user

// Bringing in protected routes
const { protect } = require("../middlewares/authMiddleware")

router.post("/", registerUser)

router.post("/login", loginUser)

router.get("/me", protect, getMe) // protected route applied


module.exports = router