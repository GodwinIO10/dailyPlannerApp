const asyncHandler = require("express-async-handler")

const Plan = require("../models/planModel")
const User = require("../models/userModel")

// @description    --> Get plans
// @method & route --> GET /api/plans 
// @access         --> Private      

// when the functions interact with mongoose database, a promise is returned, hence "async" is added before the functions

const getPlans = asyncHandler (async (req, res) => { 
  
    const plan = await Plan.find({ user: req.user.id }) // Getting specific logged-in user's plan(s). This user has an active token

    res.status(200).json(plan)
})



// @description    --> Post plans
// @method & route --> POST /api/plans 
// @access         --> Private      

const postPlans = asyncHandler (async (req, res) => {
   // const { text } = req.body

    if (!req.body.text){
        res.status(400)
        throw new Error("Please Add a text field")
    }

    const plan = await Plan.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(plan)
})



// @description    --> Update plans
// @method & route --> PUT /api/plans 
// @access         --> Private      

const updatePlans = asyncHandler (async (req, res) => {
    const plan = await Plan.findById(req.params.id)

    if(!plan) {
        res.status(400)
        throw new Error("Plan not found")
    }

    // Check if user exists
   // const user = await User.findById(req.user.id) //Include this line if protected middleware route isn't set

    // If user doesn't exist
    if(!req.user) {
        res.status(401)
        throw new Error("User not found!")
    }

    // Making sure the logged-in user matches the plan user (ie plan owner)
    if(plan.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized!")
    }

    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPlan)
})


// @description    --> Delete plans
// @method & route --> DELETE /api/plans 
// @access         --> Private      

const deletePlans = asyncHandler (async (req, res) => {
    const plan = await Plan.findById(req.params.id)

    if(!plan) {
        res.status(400)
        throw new Error("Plan not found.") // User isn't authorized to delete plan belonging to another user
    }

    // Check if user exists
    // const user = await User.findById(req.user.id)

    // If user doesn't exist
    if(!req.user) {
        res.status(401)
        throw new Error("User not found!")
    }

    // Making sure the logged-in user matches the plan user (ie plan owner)
    if(plan.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized!")
    }
    
    await Plan.findByIdAndDelete(req.params.id)

    res.status(200).json( `Plan Deleted by ${req.params.id}`)
})



module.exports = { getPlans, postPlans, updatePlans, deletePlans }