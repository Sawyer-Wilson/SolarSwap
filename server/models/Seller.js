const Mongoose = require("mongoose");

const sellerSchema = new Mongoose.Schema({
	sellerID: {
		type: String,
		default: "",
		required: true,
	},
	firstName: {
		type: String,
		default: "",
		required: true,
	},
	lastName: {
		type: String,
		default: "",
		required: true,
	},
	email: {
		type: String,
		default: "",
    required: true
	},
	energyListing: {
		type: Boolean,
    default: false,
	}
}, { timestamps: true });

module.exports = Mongoose.model("Seller", sellerSchema);
