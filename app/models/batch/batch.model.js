const mongoose = require("mongoose");
const batchSchema = require("./batch.schema");
mongoose.Promise = global.Promise;
let batchModel = mongoose.model("batch", batchSchema);
let courseModel = require("../course/course.model");
const _h = require("../../helpers/util");
const columnOrder = [
  "",
  "batchName",
  "batchAlias",
  "course.courseName",
  "startDate",
  "endDate",
  "updatedDate"
];

const columnSearch = ["", "batchName", "batchAlias", "course.courseName"];

function getFilterOrder(batchReq) {
  if (typeof batchReq.order != "undefined") {
    const columnIndex = batchReq.order[0]["column"];
    const columnOrderBy = batchReq.order[0]["dir"];

    return {
      [columnOrder[columnIndex]]: columnOrderBy
    };
  } else {
    return {
      updatedDate: "desc"
    };
  }
}

function getCourseList() {
  return courseModel.find({ isActive: true }).sort({ courseName: "asc" });
}
function createBatch(batch) {
  return batchModel.create(batch);
}

function countAllBatch(batchReq) {
  const filterQuery = _h.filterQuery(batchReq, columnSearch);

  return batchModel.find(filterQuery).count();
}
function batchList(start, end, batchReq) {
  const filterQuery = _h.filterQuery(batchReq, columnSearch);
  const courseOrderBy = getFilterOrder(batchReq);

  return batchModel
    .find(filterQuery)
    .sort(courseOrderBy)
    .populate("course")
    .limit(end)
    .skip(start)
    .exec();
}

function deletBatch(batchID) {
  if (batchID) {
    return batchModel.findByIdAndDelete(batchID);
  }
}

function findBatchById(batchID) {
  return batchModel.findById(batchID);
}

function batchLists() {
  return batchModel.find({ status: true }).sort({ batchName: "asc" });
}

batchModel.getCourseList = getCourseList;
batchModel.createBatch = createBatch;
batchModel.batchList = batchList;
batchModel.countAllBatch = countAllBatch;
batchModel.findBatchById = findBatchById;
batchModel.deletBatch = deletBatch;
batchModel.getBatchLists = batchLists;
module.exports = batchModel;
