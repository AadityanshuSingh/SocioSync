const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
        enum:["Male", "Female", "Others"],
    },
    dob:{
        type:Date,
    },
    about:{
        type:String,
    },
    ph_no:{
        type:String,
    },
    profile_img:{
        type:String,
        trime:true,
    },
})


module.exports = mongoose.model("Profile", profileSchema);