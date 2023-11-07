const express = require('express');

const router = express.Router();

const expressController = require('../controller/forgotpassword');

router.use(express.static("public"));

router.get('/forgotpassword',expressController.getHomePage);

router.post('/password/forgotpassword', expressController.sendEmail);

router.get('/resetpassword/:uu_id', expressController.getResetPasswordPage);

router.post('/password/resetpassword', expressController.changePassword);

module.exports = router;
