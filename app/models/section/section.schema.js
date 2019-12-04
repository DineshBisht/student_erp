const mongoose = require("mongoose");
const sectionSchema = mongoose.Schema(
  {
    sectionName: String,
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "batch" },
    intake: Number,
    createdBy: Number,
    updatedBy: Number,
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    status: Boolean
  },
  { collection: "std.erp.section" }
);

module.exports = sectionSchema;
