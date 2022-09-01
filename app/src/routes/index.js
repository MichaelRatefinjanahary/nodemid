const express = require('express')
const router = express.Router()

const employeeRoutes = require('./employee.routes')

const employeeCheckController = require('../controllers/employeeCheck.controller')

router.use('/employees', employeeRoutes)
router.route('/check-in/:idEmployee').post(employeeCheckController.checkIn)
router.route('/check-out/:idEmployee').post(employeeCheckController.checkOut)

module.exports = router
