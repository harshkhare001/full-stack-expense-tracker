const express = require("express");

const router = express.Router();

const userController = require("../controller/user");

router.use(express.static("public"));

router.get('/signup',userController.getSignUpPage)

router.post("/adduser", userController.addUser);

// router.post("/login", userController.login);

//router.post("/logIn", userController.logIn);

module.exports = router;