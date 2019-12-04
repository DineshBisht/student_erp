const countryModel = require("../models/confgurations/country/country.model");
const _h = require("../helpers/util");
exports.create = (req, res, next) => {
  const data = {
    formTitle: "Create Country",
    success: req.flash("success"),
    error: req.flash("error")
  };

  res.render("configuration/country/create", data);
};

exports.addCountry = (req, res) => {
  const countryData = req.body;
  if (Object.keys(countryData).length > 0) {
    const countryInfo = {
      name: countryData.name,
      status: countryData.status,
      createdDate: new Date(),
      createdBy: 1
    };
    countryModel
      .addCountry(countryInfo)
      .then(country => {
        if (country) {
          req.flash("success", "Country has been added successfully");
          res.redirect("/configuration/country");
        } else {
          req.flash("error", "Country not added");
          res.redirect("/configuration/country");
        }
      })
      .catch(err => {
        req.flash("error", "Country not added");
        res.redirect("/configuration/country");
      });
  }
};

exports.countryLists = (req, res, next) => {
  const data = {
    gridTitle: "Country Lists",
    success: req.flash("success"),
    error: req.flash("error")
  };
  res.render("configuration/country/", data);
};

exports.loadCountryLists = (req, res, next) => {
  const countryReq = req.body;
  let records = [];

  let iTotalRecords = 0;

  countryModel.countAllCountry(countryReq).then(total => {
    iTotalRecords = total;
  });

  let iDisplayLength = parseInt(countryReq.length);
  iDisplayLength = iDisplayLength < 0 ? iTotalRecords : iDisplayLength;
  let iDisplayStart = parseInt(countryReq.start);

  let sEcho = parseInt(countryReq.start);

  const countryLists = countryModel.getCountryList(
    iDisplayStart,
    iDisplayLength,
    countryReq
  );

  countryLists.then(countryLists => {
    if (countryLists.length > 0) {
      countryLists.map(country => {
        records.push([
          `<label>
        <div class="checker"><span><input type="checkbox" class='checkboxes' name='countryID[${country._id}]' value='${country._id}' ></span></div> </label>`,
          country.name,
          _h.formatDate(country.updatedDate),
          country.status ? "Active" : "In-Active",
          `<button class="btn btn-sm btn-default filter-cancel" onclick="javascript:redirectForm('configuration/country/${country._id}')">
        <i class="fa fa-pencil"></i> Edit</button>
        &nbsp;
        <button class="btn btn-sm btn-default filter-cancel" onclick="javascript:deleteCountry('${country._id}')">
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
    }
  });
};
exports.editCountry = (req, res, next) => {
  const countryID = req.params.countryID;
  if (countryID) {
    countryModel.getCountryById(countryID).then(country => {
      const data = {
        formTitle: "Edit " + country.name + " Country",
        country
      };
      res.render("configuration/country/edit", data);
    });
  } else {
    req.flash("error", "Invalid request");
    res.redirect("/configuration/country");
  }
};
exports.updateCountry = (req, res, next) => {
  const countryID = req.params.countryID;
  if (countryID) {
    const { name, status } = req.body;
    const countryInfo = {
      countryID,
      name,
      status
    };
    countryModel
      .updateCountry(countryInfo)
      .then(country => {
        req.flash("success", "Country information has been updated");
        res.redirect("/configuration/country");
      })
      .catch(err => {
        console.log(err);
        req.flash("error", "Country information not updated." + err.message);
        res.redirect("/configuration/country");
      });
  }
};

// exports.deleteCountry = (req, res, next) => {
//   countryModel.deleteCountry().then(country => {
//     res.status(200);
//     res.json({ message: "Country has been deleted" });
//   });
// };
