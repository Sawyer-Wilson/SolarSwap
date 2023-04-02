const Mongoose = require("mongoose");

const energyListingSchema = new Mongoose.Schema({
	sellerID: {
		type: Mongoose.ObjectId,
    required: true
	},
	loadZoneID: {
		type: Number,
		required: true
  },
	utilityCompany: {
		type: String,
		required: true,
    lowercase: true,
    maxLength: 50,
    match: /^[a-z '&]+$/i
  },
	annualProduction: {
		type: Number,
		required: true
  },
  annualConsumption: {
		type: Number,
		required: true
  },
  avgMonthlyOverage: {
		type: Number,
		required: true
  },
  plannedUsage: {
		type: String,
		required: true,
    match: /^(less|more)$/i
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
