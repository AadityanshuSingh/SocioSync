const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp: {
        type:String,
        required:true,
    },
	// expires: Date.now() + 1,
    createdAt: {
        type:Date,
        default:Date.now,
		expires:1*1000,
    },
});
// OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 });


async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			`<h1>Your Otp for signup on our app SocioSync is : ${otp} ;</h1>)`
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}
// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");
	// this.expiresAt
	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;