const mongoose = require("mongoose");
const batchSchema = mongoose.Schema(
  {
    batchName: String,
    batchCode: String,
    batchAlias: String,
    courseId: String,
    startDate: { type: Date },
    endDate: { type: Date },
    createdBy: Number,
    updatedBy: Number,
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    status: Boolean
  },
  { collection: "std.erp.batch" }
);

module.exports = batchSchema;
