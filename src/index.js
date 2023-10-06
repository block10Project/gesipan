const express = require("express");
const router = express.Router();
const userRouter = require("./route/user.route");
const boardRouter = require("./route/board.route");
const mainRouter = require("./route/main.route");

router.use("", mainRouter);
router.use("/users", userRouter);
router.use("/boards", boardRouter);

module.exports = router;
