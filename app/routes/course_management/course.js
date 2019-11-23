"use strict";
const router = require("express").Router();
const courseCtrl = require("../../controllers/course");
router.get("/", courseCtrl.courseLists);

router.post("/get_course_lists", courseCtrl.loadCourseLists);

router.get("/create", courseCtrl.courseForm);

router.post("/create", courseCtrl.createCourse);

router.get("/:courseId", courseCtrl.editCourse);
router.post("/:courseId", courseCtrl.updateCourse);
router.delete("/:courseId", courseCtrl.deleteCourse);

module.exports = {
  router
};
