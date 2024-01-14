const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Group",
    },
    FileUrl:{
        type: String,
    },
    created_at:{
        type: Date,
        default: Date.now(),
    }, 
});

const File = mongoose.model("File", fileSchema);
module.exports = File;