const Mongoose = require("mongoose");

const sellerSchema = new Mongoose.Schema({
	energyListingID: {
		type: Mongoose.ObjectId,
	},
	firstName: {
		type: String,
		required: true,
    lowercase: true,
    maxLength: 50,
    match: /^[a-z ,.'-]+$/i
	},
	lastName: {
		type: String,
		required: true,
    lowercase: true,
    maxLength: 50,
    match: /^[a-z ,.'-]+$/i
	},
	email: {
		type: String,
    required: true,
    lowercase: true,
    minLength: 3,
    maxLength: 255,
    match: /^\S+@\S+\.\S+$/
	}
}, { timestamps: true });

module.exports = Mongoose.model("Seller", sellerSchema);
