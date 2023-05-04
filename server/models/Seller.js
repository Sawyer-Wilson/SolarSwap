const Mongoose = require("mongoose");

const sellerSchema = new Mongoose.Schema({
	listingID: {
		type: Mongoose.ObjectId,
	},
	firstName: {
		type: String,
		required: true,
    maxLength: 50,
    match: /^[a-z ,.'-]+$/i
	},
	lastName: {
		type: String,
		required: true,
    maxLength: 50,
    match: /^[a-z ,.'-]+$/i
	},
	email: {
		type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
    match: /^\S+@\S+\.\S+$/
	},
  hash: {
		type: String,
    required: true
	}, 
	salt : {
		type: String,
    required: true
  }
}, { timestamps: true });

module.exports = Mongoose.model("Seller", sellerSchema);
