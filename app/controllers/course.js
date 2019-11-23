const courseModel = require("../models/course/course.model");

exports.createCourse = function(req, res, next) {
  const courseData = req.body;
  courseData.createdBy = 1;
  courseData.updatedBy = 1;
  courseModel.createCourse(courseData);
  req.flash("success", "Course has been added successfully");
  res.redirect("/course");
};

exports.courseForm = function(req, res, next) {
  const data = {
    pageTitle: "Create Course",
    formTitle: "Add Course",
    success: req.flash("success"),
    error: req.flash("error")
  };
  res.render("course/create", data);
};

exports.courseLists = function(req, res, next) {
  const data = {
    pageTitle: "Course",
    gridTitle: "Course Lists",
    success: req.flash("success"),
    error: req.flash("error")
  };
  res.render("course/", data);
};

exports.editCourse = function(req, res, next) {
  const courseId = req.params.courseId;

  if (courseId) {
    courseModel
      .findCourseById(courseId)
      .then(course => {
        const data = {
          pageTitle: "Edit Course",
          formTitle: "Edit Course",
          course
        };

        res.render("course/edit", data);
      })
      .catch(err => {
        req.flash("error", err.message);
        res.redirect("/course");
      });
  }
};

exports.updateCourse = function(req, res, next) {
  const courseId = req.params.courseId;

  courseModel
    .findCourseById(courseId)
    .then(course => {
      const { courseName, courseCode, courseAlias, isActive } = req.body;
      course.courseName = courseName;
      course.courseCode = courseCode;
      course.courseAlias = courseAlias;
      course.isActive = isActive;

      course.save((err, succ) => {
        if (err) {
          req.flash("error", err.message);
          res.redirect("/course/" + courseId);
        } else if (succ) {
          req.flash(
            "success",
            courseName + " course has been updated successfully"
          );
          res.redirect("/course");
        }
      });
    })
    .catch(error => {
      req.flash("error", error.message);
      res.redirect("/course/" + courseId);
    });
};

exports.deleteCourse = function(req, res) {
  const courseID = req.params.courseId;
  if (courseID) {
    courseModel
      .deleteCourseById(courseID)
      .then(course => {
        if (course) {
          res.status(200);
          res.json({ message: "Course has been deleted successfully" });
        } else {
          res.status(401);
          res.json({ message: "Course not deleted successfully" });
        }
      })
      .catch(err => {
        console.log(err.message);
        res.status(500);
        res.json({ message: "Server error " + err.message });
      });
  }
};
exports.loadCourseLists = function(req, res, next) {
  const courseReq = req.body;
  let records = [];

  let iTotalRecords = 0;

  courseModel.countAllCourse(courseReq).then(allCourseCount => {
    iTotalRecords = allCourseCount;
  });

  let iDisplayLength = parseInt(courseReq.length);
  iDisplayLength = iDisplayLength < 0 ? iTotalRecords : iDisplayLength;
  let iDisplayStart = parseInt(courseReq.start);

  let sEcho = parseInt(courseReq.start);

  const allCourses = courseModel.courseLists(
    iDisplayStart,
    iDisplayLength,
    courseReq
  );

  allCourses.then(courses => {
    if (courses.length > 0) {
      courses.map(course => {
        records.push([
          `<label>
          <div class="checker"><span><input type="checkbox" class='checkboxes' name='courseId[${course._id}]' value='${course._id}' ></span></div> </label>`,
          course.courseName,
          course.courseCode,
          course.courseAlias,
          course.isActive ? "Active" : "In-Active",
          `<button class="btn btn-sm btn-default filter-cancel" onclick="javascript:editCourse('${course._id}')">
          <i class="fa fa-pencil"></i> Edit</button>
          &nbsp;
          <button class="btn btn-sm btn-default filter-cancel" onclick="javascript:deleteCourse('${course._id}')">
          <i class="fa fa-trash"></i> Delete</button>
          
          `
        ]);
      });

      const dataTable = {
        data: records,
        draw: sEcho,
        recordsTotal: iTotalRecords,
        recordsFiltered: iTotalRecords
      };
      res.json(dataTable);
    } else {
      const dataTable = {
        data: 0,
        draw: sEcho,
        recordsTotal: iTotalRecords,
        recordsFiltered: iTotalRecords
      };
      res.json(dataTable);
    }
  });
};
