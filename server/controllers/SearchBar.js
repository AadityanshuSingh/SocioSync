const User = require("../models/User");
const mongoose = require("mongoose");

require("dotenv").config();

exports.searchbar = async (req,res) => {
    try{
        const {query} = req.body;
        const users = await User.find({ userName: { $regex: query, $options: 'i' } }).limit(10);
        return res.status(200).json({
            success:true,
            message:"users found",
            users:users,
        });
    }
    catch{
        console.error(error);
		return res.status(500).json({
			success: false,
			message: `Error in searching`,
            error: error.message,
		});
    }
}