const mongoose = require("mongoose");
const User = require("../models/User");

exports.sendRequest = async (req, res) => {
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

exports.acceptRequest = async (req, res) => {
    try{
        const acceptorID = req.user.id;
        const {newFriend} = req.body;

        const UpdatedAcceptor = await User.findByIdAndUpdate(acceptorID,
                                {"$push": {"friends" : newFriend}},
                                {new: true});
        const UpdatedFriend = await User.findByIdAndUpdate(newFriend, 
                                {"$push": {"friends" : acceptorID} },
                                {new: true});

        UpdatedAcceptor = await User.findByIdAndUpdate(acceptorID,
                        {"$pull": {"invites" : newFriend}},
                        {new: true});

        UpdatedFriend = await User.findByIdAndUpdate(newFriend,
                        {"$pull": {"requests" : acceptorID}},
                        {new: true});

        return res.status(200).json({
            success: true,
            message: 'Friend request accepted successfully.',
            sender: UpdatedSender,
            receiver: UpdatedReceiver,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in accepting request",
            error: error.message,
        })
    }
}