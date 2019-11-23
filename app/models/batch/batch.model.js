const mongoose = require("mongoose");
const batchSchema = require("./batch.schema");
mongoose.Promise = global.Promise;
let batchModel = mongoose.model("batch", batchSchema);

const columnOrder = [
  "",
  "batchName",
  "batchCode",
  "batchAlias",
  "courseId",
  "startDate",
  "endDate",
  "updatedDate"
];

const columnSearch = [
  "",
  "batchName",
  "batchCode",
  "batchAlias",
  "courseId",
  "startDate",
  "endDate",
  "updatedDate"
];

function createCourse(course) {
  batchModel.create(course);
}

function getFilter(courseInfo) {
  var searchQuery = {};

  if (courseInfo.search.value != "") {
    const searchTerm = new RegExp(courseInfo.search.value.trim());

    var newSearchQuery = { $or: [] };
    columnSearch.map((column, index) => {
      if (column != "") {
        newSearchQuery["$or"].push({
          [column]: { $regex: searchTerm, $options: "imxs" }
        });
      }
    });
    searchQuery = newSearchQuery;
  }
  return searchQuery;
}
function getFilterOrder(courseReq) {
  if (typeof courseReq.order != "undefined") {
    const columnIndex = courseReq.order[0]["column"];
    const columnOrderBy = courseReq.order[0]["dir"];

    return {
      [columnOrder[columnIndex]]: columnOrderBy
    };
  } else {
    return {
      updatedDate: "desc"
    };
  }
}
function courseLists(start, end, courseReq) {
  const filterQuery = getFilter(courseReq);
  const courseOrderBy = getFilterOrder(courseReq);
  console.log("---------");
  console.log(courseOrderBy);
  return batchModel
    .find(filterQuery)
    .sort(courseOrderBy)
    .limit(end)
    .skip(start);
}

function countAllCourse(courseReq) {
  const filterQuery = getFilter(courseReq);

  return batchModel.find(filterQuery).count();
}

function findCourseById(courseId) {
  return batchModel.findById(courseId);
}

function deleteCourseById(courseID) {
  return batchModel.findByIdAndDelete(courseID);
}
batchModel.createCourse = createCourse;
batchModel.courseLists = courseLists;
batchModel.countAllCourse = countAllCourse;
batchModel.findCourseById = findCourseById;
batchModel.deleteCourseById = deleteCourseById;
module.exports = batchModel;
