const express = require('express');

const router = express.Router();

const expressController = require('../controller/premium');
const userAuthenticator = require('../middleware/auth');

router.get('/premium/getleaders', userAuthenticator.authenticate, expressController.showLead)

module.exports = router;
