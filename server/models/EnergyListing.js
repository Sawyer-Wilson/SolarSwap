const Mongoose = require("mongoose");

const energyListingSchema = new Mongoose.Schema({
	sellerID: {
		type: Mongoose.ObjectId,
    required: true
	},
	municipality: {
		type: String,
		required: true,
    lowercase: true,
    maxLength: 50,
    match: /^[a-z '&]+$/i
  },
	utilityProvider: {
		type: String,
		required: true,
    lowercase: true,
    maxLength: 50,
    match: /^[a-z '&]+$/i
  },
  avgMonthlyOverage: {
		type: Number,
		required: true
  },
  pctOverageToSell: {
		type: Number,
		required: true
  },
  askingRate: {
		type: Number,
		required: true
  }
}, { timestamps: true });

module.exports = Mongoose.model("Energylisting", energyListingSchema);
