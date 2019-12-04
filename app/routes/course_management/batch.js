"use strict";
const router = require("express").Router();
const batchController = require("../../controllers/batch");
router.get("/", batchController.batchLists);

router.post("/get_batch_lists", batchController.loadBatchLists);

router.get("/create", batchController.create);

router.post("/create", batchController.createBatch);

router.get("/:batchID", batchController.editBatch);
router.post("/:batchID", batchController.updateBatch);
router.delete("/:batchID", batchController.deleteBatch);

module.exports = {
  router
};
