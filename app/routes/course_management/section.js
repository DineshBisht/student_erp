"use strict";
const router = require("express").Router();
const sectionCtrl = require("../../controllers/section");

const sectionMiddleWare = function(req, res, next) {
  req.activeSidebar = "section";
  next();
};

router.get("/", sectionMiddleWare, sectionCtrl.sectionLists);
router.post("/get_section_lists", sectionCtrl.loadSectionLists);

router.get("/create", sectionMiddleWare, sectionCtrl.createSectionForm);
router.post("/create", sectionCtrl.createSection);

router.get("/:sectionID", sectionCtrl.editSection);
router.post("/:sectionID", sectionCtrl.updateSection);

module.exports = {
  router
};
