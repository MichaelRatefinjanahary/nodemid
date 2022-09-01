const createError = require('http-errors')
const employeeCheckService = require('../services/employeeCheck.service')

exports.checkIn = async (req, res, next) => {
  try {
    const { comment } = req.body

    const newCheckIn = await employeeCheckService.checkIn(
      req.params.idEmployee,
      comment
    )
    res.status(200).send(newCheckIn)
  } catch (error) {
    next(createError(error))
  }
}

exports.checkOut = async (req, res, next) => {
  try {
    const { comment } = req.body

    const updatedEmployeeCheck = await employeeCheckService.checkOut(
      req.params.idEmployee,
      comment
    )
    res.status(200).send(updatedEmployeeCheck)
  } catch (error) {
    next(createError(error))
  }
}
