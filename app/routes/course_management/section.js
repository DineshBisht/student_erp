"use strict";
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("course/");
});

module.exports = {
  router
};
