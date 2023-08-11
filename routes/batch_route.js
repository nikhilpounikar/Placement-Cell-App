const express = require("express");
const passport = require("passport");

const batchController = require("../controller/batch_controller");

const router = express.Router();

router.get("/create-batch", batchController.createBatch);

module.exports = router;