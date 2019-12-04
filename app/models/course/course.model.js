const mongoose = require("mongoose");
const courseSchema = require("./course.schema");
mongoose.Promise = global.Promise;
let courseModel = mongoose.model("course", courseSchema);

const columnOrder = ["", "courseName", "courseCode", "courseAlias", "isActive"];
const columnSearch = [
  "",
  "courseName",
  "courseCode",
  "courseAlias",
  "courseAlias"
];

function createCourse(course) {
  courseModel.create(course);
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
  return courseModel
    .find(filterQuery)
    .sort(courseOrderBy)
    .limit(end)
    .skip(start);
}

function countAllCourse(courseReq) {
  const filterQuery = getFilter(courseReq);

  return courseModel.find(filterQuery).count();
}

function findCourseById(courseId) {
  return courseModel.findById(courseId);
}

function deleteCourseById(courseID) {
  return courseModel.findByIdAndDelete(courseID);
}
courseModel.createCourse = createCourse;
courseModel.courseLists = courseLists;
courseModel.countAllCourse = countAllCourse;
courseModel.findCourseById = findCourseById;
courseModel.deleteCourseById = deleteCourseById;
module.exports = courseModel;
