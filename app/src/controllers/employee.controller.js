const createError = require('http-errors')
const employeeService = require('../services/employee.service')

exports.createEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.create(req.body)
    res.status(201).send(employee)
  } catch (error) {
    next(createError(error))
  }
}

exports.findAll = async (req, res, next) => {
  try {
    const employees = await employeeService.findAll(req.query)
    res.send(employees)
  } catch (error) {
    next(createError(error))
  }
}
