import Media from "../models/Media";


exports.fileUpload = async (req, res) => {
    try{
        // data fetch
        const {sender, receiver, group, mediaType} = req.body;
        const senderID = await User.findOne({userName: sender});
        const receiverID = null
        const groupID = null
        if(receiver)
        {
            receiverID = await User.findOne({userName: receiver});
        }

        const file = req.files.media;
        console.log(file);

        // validation
        let supportedTypes = [];

        if(mediaType === "Photo")
        supportedTypes = ["jpg", "jpeg", "png", "gif"];
        if(mediaType === "Video")
        supportedTypes = ["mp4", "mov", "mkv"];
        if(mediaType === "Doc")
        supportedTypes = ["pdf", "xls", "docx"];
        if(mediaType === "Audio")
        supportedTypes = ["mp3", "m4a"];

        const fileType = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes))
        {
            return res.status(400).json({
                success: false,
                message:'File format not supported',
            })
        }

        if (file.size > 80 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                message: 'File size exceeds the limit (80 MB)',
            });
        }

        const response = await uploadFileToCloudinary(
        file,
        process.env.FOLDER_NAME);

        console.log(response);

        // save entry in db
        const fileData = await Media.create({
            sender:sender,
            receiver:receiver,
            group:group,
            FileUrl:response.secure_url,
            created_at:Date.now(),
        });

        res.json({
            success: true,
            mediaUrl: response.secure_url,
            message: "File Uploaded Successfully",
            data:fileData,
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