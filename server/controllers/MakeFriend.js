const mongoose = require("mongoose");
const User = require("../models/User");

exports.makeFriend = async (req, res) => {
    try{
        const senderID = req.user.id;
        const {receiverID} = req.body;

        const UpdatedSender = await User.findByIdAndUpdate(senderID, {"$push": {"requests" : receiverID},}, {new: true});
        const UpdatedReceiver = await User.findByIdAndUpdate(receiverID, {"$push": {"invites" : senderID} }, {new: true});

        return res.status(200).json({
            success: true,
            message: 'Friend request sent successfully.',
            sender: UpdatedSender,
            receiver: UpdatedReceiver,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in sending request",
            error: error.message,
        })
    }
}