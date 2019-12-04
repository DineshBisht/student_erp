const mongoose = require("mongoose");
const batchSchema = mongoose.Schema(
  {
    batchName: String,
    batchAlias: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
    startDate: { type: Date },
    endDate: { type: Date },
    createdBy: Number,
    updatedBy: Number,
    createdDate: { type: Date },
    updatedDate: { type: Date, default: Date.now },
    status: Boolean
  },
  { collection: "std.erp.batch" }
);

module.exports = batchSchema;
