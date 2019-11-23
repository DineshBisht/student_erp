"use strict";
const router = require("express").Router();
const batchController = require("../../controllers/batch");
router.get("/", batchController.batchLists);

// router.post("/get_course_lists", batchController.loadCourseLists);

router.get("/create", batchController.create);

// router.post("/create", batchController.createCourse);

// router.get("/:courseId", batchController.editCourse);
// router.post("/:courseId", batchController.updateCourse);
// router.delete("/:courseId", batchController.deleteCourse);

module.exports = {
  router
};
