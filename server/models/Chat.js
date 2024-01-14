const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    chatType:{
        type:String,
        enum :["personal","group"],
        default:"personal",
        // TODO:-Depends on socket
    },
    // status:{
    //     enum:["Pending", "Sent", "Seen"],
    //     // Todo:-Depends on socket
    // },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
    },
    reactions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reaction",
    }],
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    MediaType:{
        type:String,
        enum:["Text","Media","Links","Files"],
        default:"Text",
    },
    message:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("Chat", chatSchema);