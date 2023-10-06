const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);

router.get("/register", userController.getRegister);
router.post("/register", userController.postRegister);

router.get("/password", userController.getPassword);
router.post("/password", userController.postPassword);

router.get("/info", userController.getInfo);

router.get("/following", userController.getFollowing);

router.get("/follower", userController.getFollower);

router.get("/list", userController.getList);

router.get("/logout", userController.getLogout);
