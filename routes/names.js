const express = require("express");
const router = express.Router();
const {
  Getalldata,
  Postalldata,
  Putalldata,
  Deletealldata,
} = require("../controllers/todocontrollers");

router.route("/").get(Getalldata).post(Postalldata);
router.route("/:id").put(Putalldata).delete(Deletealldata);


module.exports = router;
