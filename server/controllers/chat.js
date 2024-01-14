// user id has been received
// fetch sender and receiver
// chat ke array ko update karo
const mongoose = require("mongoose");
const User = require("../models/User");
const Chat = require("../models/Chat");
const Group = require("../models/Group");

exports.updateChat = async (req, res) => {
    try{
        const {sender, receiver, message, chatType, MediaType, groupId} = req.body;
        const chatDetails = await Chat.create({
            sender : sender,
            receiver:receiver,
            // will be kept null if grpchat
            message:message,
            chatType:chatType,
            MediaType:MediaType,
            groupId: groupId,
            // will be kept null in personal chat
        });
        const UpdatedSenderChats = await User.findByIdAndUpdate(sender, {"$push": {"chats" : chatDetails._id},}, {new: true});
        var UpdatedReceiverChats;
        if(receiver)
        {
            UpdatedReceiverChats = await User.findByIdAndUpdate(receiver, {"$push": {"chats" : chatDetails._id},}, {new: true});
        }
        else{
            UpdatedReceiverChats = await Group.findByIdAndUpdate(groupId, {"$push": {"chats" : chatDetails._id},}, {new: true});
            // group model has been updated
        }
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