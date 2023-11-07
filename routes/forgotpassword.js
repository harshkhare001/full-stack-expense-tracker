const express = require('express');

const router = express.Router();

const expressController = require('../controller/forgotpassword');

router.use(express.static("public"));

router.get('/forgotpassword',expressController.getHomePage);

router.post('/password/forgotpassword', expressController.getEmail);

module.exports = router;