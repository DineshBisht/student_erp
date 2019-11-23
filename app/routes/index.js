"use strict";
const courseRouter = require("./course_management/course");
const batchRouter = require("./course_management/batch");

module.exports = {
  course: courseRouter.router,
  batch: batchRouter.router
};
