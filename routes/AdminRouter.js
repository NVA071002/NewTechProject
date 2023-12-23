const express = require("express");
const router = express.Router();
const adminController = require("../controller/AdminController")

router.post("/add", adminController.add)
router.put("/update/:id", adminController.update)

module.exports = router;