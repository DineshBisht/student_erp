const moment = require("moment");
exports.formatDate = function(date, format = "DD/MM/YYYY") {
  if (date) {
    return moment(date).format(format);
  }
};

exports.filterQuery = function(searchContent, columnSearch) {
  var searchQuery = {};

  if (searchContent.search.value != "") {
    const searchTerm = new RegExp(searchContent.search.value.trim());

    var newSearchQuery = { $or: [] };
    columnSearch.map(column => {
      if (column != "") {
        newSearchQuery["$or"].push({
          [column]: { $regex: searchTerm, $options: "imxs" }
        });
      }
    });
    searchQuery = newSearchQuery;
  }
  return searchQuery;
};

exports.getFilterOrder = (reqInfo, columnOrder) => {
  if (typeof reqInfo.order != "undefined") {
    const columnIndex = reqInfo.order[0]["column"];
    const columnOrderBy = reqInfo.order[0]["dir"];

    return {
      [columnOrder[columnIndex]]: columnOrderBy
    };
  } else {
    return {
      updatedDate: "desc"
    };
  }
};
