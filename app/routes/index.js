"use strict";
const courseRouter = require("./course_management/course");
const batchRouter = require("./course_management/batch");
const sectionRouter = require("./course_management/section");
const countryRouter = require("./configurations/country.routes");
module.exports = {
  course: courseRouter.router,
  batch: batchRouter.router,
  section: sectionRouter.router,
  country: countryRouter.router
};
