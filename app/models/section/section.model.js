const mongoose = require("mongoose");
const sectionSchema = require("./section.schema");
mongoose.Promise = global.Promise;

const sectionModel = mongoose.model("section", sectionSchema);
const batchModel = require("../batch/batch.model");
const _h = require("../../helpers/util");

const columnOrder = [
  "",
  "sectionName",
  "batchName",
  "intake",
  "updatedDate",
  "status"
];
const columnSearch = ["", "sectionName", "batch.batchName"];

const countAllSection = sectionReq => {
  const filterQuery = _h.filterQuery(sectionReq, columnSearch);

  return sectionModel.find(filterQuery).count();
};

function sectionList(start, end, sectionReq) {
  const filterQuery = _h.filterQuery(sectionReq, columnSearch);
  const sectionOrderBy = _h.getFilterOrder(sectionReq, columnOrder);

  return sectionModel
    .find(filterQuery)
    .sort(sectionOrderBy)
    .populate("batch")
    .limit(end)
    .skip(start)
    .exec();
}

const getBatchLists = () => {
  return batchModel.getBatchLists();
};

const createSection = section => {
  return sectionModel.create(section);
};

const getSectionById = sectionID => {
  return sectionModel.findById(sectionID);
};
sectionModel.getBatchLists = getBatchLists;
sectionModel.createSection = createSection;
sectionModel.sectionList = sectionList;
sectionModel.countAllSection = countAllSection;
sectionModel.getSectionById = getSectionById;

module.exports = sectionModel;
