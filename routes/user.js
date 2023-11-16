const express = require("express");

const router = express.Router();

const userController = require("../controller/user");

router.use(express.static("public"));

router.get('/signup',userController.getSignUpPage)

router.post("/signup", userController.addUser);

router.get('/login',userController.getLoginPage)

router.post("/login", userController.login);

module.exports = router;
