const Group = require('../models/Group');
const Media = require('../models/Media');
const User = require('../models/User');
const cloudinary = require("cloudinary").v2;

function isFileTypeSupported(type, supportedTypes)
{
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    options.resource_type = "auto";
    if(quality)
    {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file, options);
}

exports.fileUpload = async (req, res) => {
    try{
        // data fetch
        const {sender, receiver, group} = req.body;
        const senderID = await User.findOne({userName: sender});
        const receiverID = null
        const groupID = null
        if(receiver)
        {
            receiverID = await User.findOne({userName: receiver});
        }
        else
        {
            groupID = await Group.findOne({name: group});
        }

        const file = req.files.media;
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png", "mp4", "mov", "mkv", "pdf"];
        const fileType = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes))
        {
            return res.status(400).json({
                success: false,
                message:'File format not supported',
            })
        }

        // file format is supported
        const response = await uploadFileToCloudinary(file, "MyProject");
        console.log(response);

        // save entry in db

        const fileData = await Media.create({
            sender:senderID,
            receiver:receiverID,
            group:groupID,
            FileUrl:response.secure_url,
        });

        res.json({
            success: true,
            mediaUrl: response.secure_url,
            message: "File Uploaded Successfully"
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong while uploading file",
        })
    }
}