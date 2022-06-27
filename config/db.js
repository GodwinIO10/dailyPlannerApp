const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        console.log(`Connected to the MongoDB: via ${conn.connection.host}`)
    }
    catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit()
    }
}

module.exports = connectDB