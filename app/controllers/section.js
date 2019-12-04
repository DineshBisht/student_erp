const sectionModel = require("../models/section/section.model");
const _h = require("../helpers/util");

exports.createSectionForm = async function(req, res) {
  const batchLists = await sectionModel.getBatchLists();
  const data = {
    pageTitle: "Create Section",
    formTitle: "Add Section",
    batchLists,
    success: req.flash("success"),
    error: req.flash("error")
  };

  res.render("course_management/section/create", data);
};

exports.createSection = function(req, res) {
  const { sectionName, intake, batch, status } = req.body;
  const formData = {
    sectionName,
    intake,
    batch,
    status,
    createdBy: 1,
    updatedBy: 1
  };

  sectionModel.createSection(formData).then(section => {
    if (section) {
      req.flash("success", "Section has been created");
      res.redirect("/section");
      // req.flash(
      //   "success",
      //   courseName + " course has been updated successfully"
      // );
      // res.redirect("/course");
    }
  });
};

exports.sectionLists = function(req, res, next) {
  const data = {
    pageTitle: "Section",
    gridTitle: "Section Lists",
    success: req.flash("success"),
    error: req.flash("error"),
    activeSidebar: req.activeSidebar
  };
  res.render("course_management/section/", data);
};
exports.loadSectionLists = function(req, res, next) {
  const sectionReq = req.body;
  let records = [];

  let iTotalRecords = 0;

  sectionModel.countAllSection(sectionReq).then(totalSection => {
    iTotalRecords = totalSection;
  });

  let iDisplayLength = parseInt(sectionReq.length);
  iDisplayLength = iDisplayLength < 0 ? iTotalRecords : iDisplayLength;
  let iDisplayStart = parseInt(sectionReq.start);

  let sEcho = parseInt(sectionReq.start);

  const sectionList = sectionModel.sectionList(
    iDisplayStart,
    iDisplayLength,
    sectionReq
  );

  sectionList.then(section => {
    if (section.length > 0) {
      section.map(section => {
        records.push([
          `<label>
          <div class="checker"><span><input type="checkbox" class='checkboxes' name='batchId[${section._id}]' value='${section._id}' ></span></div> </label>`,
          section.sectionName,
          section.batch.batchName,
          section.intake,
          _h.formatDate(section.updatedDate, "DD/MM/YYYY"),
          section.status ? "Active" : "In-Active",
          `<button class="btn btn-sm btn-default filter-cancel" onclick="javascript:redirectForm('section/${section._id}')">
          <i class="fa fa-pencil"></i> Edit</button>
          &nbsp;
          <button class="btn btn-sm btn-default filter-cancel" onclick="javascript:deleteSection('${section._id}')">
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

exports.editSection = (req, res, next) => {
  const sectionID = req.params.sectionID;

  const section = sectionModel.getSectionById(sectionID);
  section
    .then(section => {
      if (section) {
        sectionModel.getBatchLists().then(batchLists => {
          const data = {
            pageTitle: "Edit Section",
            formTitle: "Edit Section",
            batchLists,
            section,
            success: req.flash("success"),
            error: req.flash("error")
          };

          res.render("course_management/section/edit", data);
        });
      } else {
        req.flash("error", "Invalid request");
        res.redirect("/section");
      }
    })
    .catch(err => {
      console.log(err);
      req.flash("error", "Invalid request");
      res.redirect("/section");
    });
};

exports.updateSection = (req, res, next) => {
  const sectionID = req.params.sectionID;

  const sectionInfo = sectionModel.getSectionById(sectionID);
  const { sectionName, status, batch, intake } = req.body;

  sectionInfo
    .then(section => {
      if (section) {
        section.sectionName = sectionName;
        section.status = status;
        section.batch = batch;
        section.intake = intake;
        section.save();

        req.flash("success", "Section has been saved successfully");
        res.redirect("/section");
      } else {
        req.flash("error", "Invalid request");
        res.redirect("/section");
      }
    })
    .catch(err => {
      req.flash("error", " There was an error " + err.message);
      res.redirect("/section");
    });
};
