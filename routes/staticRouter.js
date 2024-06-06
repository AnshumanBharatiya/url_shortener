const express = require('express');
const {staticsRenderViews} = require('../controllers/url');
const router = express.Router();

router.get('/form', staticsRenderViews);

module.exports = router;