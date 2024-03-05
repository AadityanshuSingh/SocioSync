const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
    updateChat,
    getChats,
} = require("../controllers/Chat")

const { auth } = require("../middlewares/auth")

router.put("/updatechat", updateChat)
router.get("/getchats", getChats)

module.exports = router