const express = require('express')
const router = express.Router()
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/CertificatesController')

router.route('/testget').get(getGoals).post(setGoal)
router.route('/tesetput').delete(deleteGoal).put(updateGoal)

module.exports = router