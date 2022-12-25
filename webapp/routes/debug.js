const express = require('express');
const router = express.Router();
const {
  getGoals
} = require('../controllers/debug.controller');

router.route('/testget').get(getGoals);

module.exports = router; 