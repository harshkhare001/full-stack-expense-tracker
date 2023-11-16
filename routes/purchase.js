const express = require('express');

const router = express.Router();

const expressController = require('../controller/purchase');
const userAuthenticator = require('../middleware/auth');

router.get('/prememiumuser', userAuthenticator.authenticate,expressController.purchasePremium);

router.post('/updatetransaction', userAuthenticator.authenticate,expressController.updateTransaction);

module.exports = router;
