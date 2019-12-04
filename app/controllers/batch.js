const batchModel = require("../models/batch/batch.model");
const _h = require("../helpers/util");
exports.createBatch = function(req, res, next) {
  const batchData = req.body;
  batchData.createdBy = 1;
  batchData.updatedBy = 1;
  batchModel.createBatch(batchData);
  req.flash("success", "Batch has been added successfully");
  res.redirect("/batch");
};

exports.create = async function(req, res, next) {
  const courseLists = await batchModel.getCourseList();

  const data = {
    pageTitle: "Create Batch",
    formTitle: "Add Batch",
    success: req.flash("success"),
    error: req.flash("error"),
    courseLists
  };
  res.render("batch/create", data);
};

exports.batchLists = function(req, res, next) {
  const data = {
    pageTitle: "Batch",
    gridTitle: "Batch Lists",
    success: req.flash("success"),
    error: req.flash("error")
  };
  res.render("batch/", data);
};

exports.updateBatch = function(req, res, next) {
  const batchId = req.params.batchID;
  if (batchId) {
    batchModel
      .findBatchById(batchId)
      .then(batch => {
        const {
          batchName,
          batchAlias,
          course,
          startDate,
          endDate,
          status
        } = req.body;

        batch.batchName = batchName;
        batch.batchAlias = batchAlias;
        batch.course = course;
        batch.startDate = startDate;
        batch.endDate = endDate;
        batch.status = status;

        batch.save((err, succ) => {
          if (err) {
            req.flash("error", err.message);
            res.redirect("/batch");
          } else if (succ) {
            req.flash("success", "Batch has been updated successfully");
            res.redirect("/batch");
          }
        });
      })
      .catch(err => {
        req.flash("error", err.message);
        res.redirect("/batch");
      });
  } else {
    req.flash("error", "Request Parameter not found");
    res.redirect("/batch");
  }
};

exports.editBatch = async function(req, res, next) {
  const batchId = req.params.batchID;
  const data = {
    pageTitle: "Edit Batch",
    formTitle: "Edit Batch",
    _h: _h
  };

  await batchModel.getCourseList().then(courseLists => {
    if (courseLists) {
      data.courseLists = courseLists;
    }
  });

  if (batchId) {
    batchModel
      .findBatchById(batchId)
      .then(batch => {
        data.batch = batch;
        res.render("batch/edit", data);
      })
      .catch(err => {
        req.flash("error", err.message);
        res.redirect("/batch");
      });
  } else {
    req.flash("error", "Request Parameter not found");
    res.redirect("/batch");
  }
};

exports.loadBatchLists = function(req, res, next) {
  const batchReq = req.body;
  let records = [];

  let iTotalRecords = 0;

  batchModel.countAllBatch(batchReq).then(totalBatch => {
    iTotalRecords = totalBatch;
  });

  let iDisplayLength = parseInt(batchReq.length);
  iDisplayLength = iDisplayLength < 0 ? iTotalRecords : iDisplayLength;
  let iDisplayStart = parseInt(batchReq.start);

  let sEcho = parseInt(batchReq.start);

  const batchList = batchModel.batchList(
    iDisplayStart,
    iDisplayLength,
    batchReq
  );

  batchList.then(batch => {
    if (batch.length > 0) {
      batch.map(batch => {
        records.push([
          `<label>
          <div class="checker"><span><input type="checkbox" class='checkboxes' name='batchId[${batch._id}]' value='${batch._id}' ></span></div> </label>`,
          batch.batchName,
          batch.batchAlias,
          batch.course.courseName,
          _h.formatDate(batch.startDate, "DD/MM/YYYY"),
          _h.formatDate(batch.endDate, "DD/MM/YYYY"),
          batch.status ? "Active" : "In-Active",
          `<button class="btn btn-sm btn-default filter-cancel" onclick="javascript:redirectForm('batch/${batch._id}')">
          <i class="fa fa-pencil"></i> Edit</button>
          &nbsp;
          <button class="btn btn-sm btn-default filter-cancel" onclick="javascript:deleteBatch('${batch._id}')">
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

exports.deleteBatch = function(req, res, next) {
  const batchID = req.params.batchID;
  if (batchID) {
    batchModel
      .deletBatch(batchID)
      .then(batch => {
        res.status(200);
        res.json({ message: "Batch has been deleted successfully" });
      })
      .catch(err => {
        res.status(401);
        res.json({ message: "Batch not deleted successfully" });
      });
  } else {
    res.status(401);
    res.json({ message: "Required parameter not found" });
  }
};
