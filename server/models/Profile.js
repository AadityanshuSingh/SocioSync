const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
        enum:["Male", "Female"],
    },
    dateOfBirth:{
        type:Date,
    },
    about:{
        type:String,
    },
    contactNumber:{
        type:String,
    },
    profileImage:{
        type:String,
        trim:true,
    },
})


module.exports = mongoose.model("Profile", profileSchema);