const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    created_at:{
        type:Date,
        default:Date.now(),
    },
    content:{
        type:String,
        enum:["Text", "Media", "Files", "Links"],
        default: "Text",
    },
    views:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    comments:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        message:{
            type:String,
        },
        created_at:{
            type:Date,
            default:Date.now(),
        },
    }],
})


module.exports = mongoose.model("Story", storySchema);