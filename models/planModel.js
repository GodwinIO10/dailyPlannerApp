const mongoose = require("mongoose")

const planSchema = new mongoose.Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    text: { 
            type: String, 
            required: [true, "Please add a text value"],
            unique: true, 
        },
       
    }, 
    { 
        timestamps: true, 
    },  
)

module.exports = mongoose.model("Plan", planSchema) 

// mongoose creates "plans" collection inside the mongoDB from "Plan" specified. 