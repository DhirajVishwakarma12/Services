const mongoose = require("mongoose")

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Db connected..");
        
    } catch (error) {
        console.log("Db Disconnected..");
        
    }
}

module.exports = connectToDB;