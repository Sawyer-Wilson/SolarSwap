const Mongoose = require("mongoose");

const offerSchema = new Mongoose.Schema({
	sellerID: {
		type: Mongoose.ObjectId,
    required: true
	},
	email: {
		type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
    match: /^\S+@\S+\.\S+$/
	},
  message: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = Mongoose.model("Offer", offerSchema);
