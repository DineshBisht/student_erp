const mongoose = require("mongoose");
const courseSchema = mongoose.Schema(
  {
    courseName: String,
    courseCode: String,
    courseAlias: String,
    createdBy: Number,
    updatedBy: Number,
    isActive: Boolean,
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
  },
  { collection: "std.erp.course" }
);

module.exports = courseSchema;
