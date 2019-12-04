const router = require("express").Router();
const countryCtrl = require("../../controllers/country");

router.get("/", countryCtrl.countryLists);
router.post("/", countryCtrl.loadCountryLists);

router.get("/:countryID", countryCtrl.editCountry);
router.post("/:countryID", countryCtrl.updateCountry);
//router.delete("/:countryID", countryCtrl.deleteCountry);

router.get("/create", countryCtrl.create);
router.post("/create", countryCtrl.addCountry);

module.exports = {
  router
};
