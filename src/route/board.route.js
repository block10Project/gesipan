const express = require("express");
const boardController = require("../controller/board.controller");
const router = express.Router();

router.get("/write", boardController.getWrite);
router.post("/write", boardController.postWrite);

router.get("/read", boardController.getRead);

router.get("/good", boardController.getGood);

router.get("/notgood", boardController.getNotGood);

router.get("/following", boardController.getFollowing);

router.get("/unfollowing", boardController.getUnfollowing);

router.get("/modify", boardController.getModify);
router.post("/modify", boardController.postModify);

router.get("/delete", boardController.getDelete);

router.post("/comment", boardController.postComment);

module.exports = router;
