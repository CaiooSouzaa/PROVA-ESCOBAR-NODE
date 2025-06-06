const mongoose = require("mongoose")

try{
    const url = "banco"

    mongoose.connect(url)
}catch(err){
    console.log(err)
}

mongoose.Promise = global.Promise

module.exports = mongoose