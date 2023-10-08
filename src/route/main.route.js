const express = require("express");
const mainController = require("../controller/main.controller");
const router = express.Router();

router.get("/", mainController.getList);

router.post("/search", mainController.postSearch);
router.get("/search", mainController.getSearch);

module.exports = router;
