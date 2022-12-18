const express = require('express');
const router = express.Router();
const {
  getGoals
} = require('../controllers/certificate.controller');

router.route('/testget').get(getGoals);

module.exports = router; 