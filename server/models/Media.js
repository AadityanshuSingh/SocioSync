const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    mediaType:{
        type: String,
        enum:["Photo", "Video", "Docs", "Audio"],
    },
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

const Media = mongoose.model("Media", fileSchema);
module.exports = Media;