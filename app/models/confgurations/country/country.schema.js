const mongoose = require("mongoose");

const countrySchema = mongoose.Schema(
  {
    name: String,
    createdBy: Number,
    updatedBy: Number,
    createdDate: { type: Date },
    updatedDate: { type: Date, default: Date.now }
  },
  {
    collection: "std.erp.country"
  }
);

module.exports = countrySchema;
