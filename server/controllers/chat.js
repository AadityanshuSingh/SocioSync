// user id has been received
// fetch sender and receiver
// chat ke array ko update karo
const mongoose = require("mongoose");
const User = require("../models/User");
const Chat = require("../models/Chat");

exports.updateChat = async (req, res) => {
    try{
        const {sender, receiver, message} = req.body;
        const chatDetails = await Chat.create({
            sender : sender,
            receiver:receiver,
            message:message,
        });
        const UpdatedSenderChats = await User.findByIdAndUpdate(sender, {"$push": {"chats" : chatDetails._id},}, {new: true});
        const UpdatedReceiverChats = await User.findByIdAndUpdate(receiver, {"$push": {"chats" : chatDetails._id},}, {new: true});

        return res.status(200).json({
            success: true,
            message: 'Chats updated successfully.',
            senderChat: UpdatedSenderChats,
            receiver: UpdatedReceiverChats,
        })
    }
    catch(error){
            console.error(error);
            return res.status(500).json({
                success:false,
                message:"Error in updating Chats",
                error: error.message,
            })
    }
}