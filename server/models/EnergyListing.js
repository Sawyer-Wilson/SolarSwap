const Mongoose = require("mongoose");

const energyListingSchema = new Mongoose.Schema({
	sellerID: {
		type: Mongoose.ObjectId,
    required: true
	},
  isActive: {
		type: Boolean,
    default: false
	},
  sellerFirstName: {
		type: String,
		required: true,
    maxLength: 50,
    match: /^[a-z ,.'-]+$/i
	},
	municipality: {
		type: String,
		required: true,
    maxLength: 50,
    match: /^[a-z '&]+$/i
  },
	utilityProvider: {
		type: String,
		required: true,
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
