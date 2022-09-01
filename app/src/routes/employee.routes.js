const express = require('express')
const router = express.Router()

const employeeController = require('../controllers/employee.controller')

router
  .route('/')
  .post(employeeController.createEmployee)
  .get(employeeController.findAll)

module.exports = router
