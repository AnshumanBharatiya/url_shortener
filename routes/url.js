const express = require('express');
const {handelGeneratenewShortUrl, handelToGetAnalytics, handelRedirectUrl, testrenderViews} = require('../controllers/url');
const router = express.Router();

router.get('/test', testrenderViews);
router.post('/', handelGeneratenewShortUrl);
router.get('/analytics/:shortId', handelToGetAnalytics);
router.get('/:shortId', handelRedirectUrl);


module.exports = router;