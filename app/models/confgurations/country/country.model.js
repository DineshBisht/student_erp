const mongoose = require("mongoose");
const _h = require("../../../helpers/util");
const countrySchema = require("./country.schema");

const countryModel = mongoose.model("country", countrySchema);

const columnOrder = ["", "name", "status"];

const columnSearch = ["", "name", "status"];

countryModel.addCountry = countryInfo => {
  return countryModel.create(countryInfo);
};

countryModel.getCountryById = countryID => {
  if (countryID) return countryModel.findById(countryID);
  return undefined;
};

countryModel.updateCountry = countryInfo => {
  return countryModel.findById(countryInfo.countryID).then(country => {
    country.name = countryInfo.name;
    country.status = countryInfo.status;
    country.save();
  });
};

countryModel.getCountryList = (start, end, countryReq) => {
  const filterQuery = _h.filterQuery(countryReq, columnSearch);
  const countryOrderBy = _h.getFilterOrder(countryReq, columnOrder);

  return countryModel
    .find(filterQuery)
    .sort(countryOrderBy)
    .limit(end)
    .skip(start)
    .exec();
};

countryModel.deleteCountry = countryID => {
  if (countryID) {
    return countryModel.findByIdAndDelete(countryID);
  }
};

countryModel.countAllCountry = countryReq => {
  const filterQuery = _h.filterQuery(countryReq, columnSearch);
  return countryModel.find(filterQuery).count();
};
module.exports = countryModel;
