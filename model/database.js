const mongoose = require("mongoose")

try{
    const url = "mongodb+srv://caio:caio123456@cluster0.hevzzbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    mongoose.connect(url)
}catch(err){
    console.log(err)
}

mongoose.Promise = global.Promise

module.exports = mongoose