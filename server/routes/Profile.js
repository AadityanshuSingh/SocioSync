const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
    updateProfile,
    getAllUsers,
    updateDisplayPicture,
} = require("../controllers/Profile")

const { auth } = require("../middlewares/auth")

router.post("/updateprofile", auth, updateProfile)
router.get("/getallusers", getAllUsers)
router.post("/updateDisplayPicture", updateDisplayPicture)

module.exports = router