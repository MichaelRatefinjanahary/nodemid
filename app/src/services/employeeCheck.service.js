const createError = require('http-errors')
const moment = require('moment')
const Employee = require('../models/employee.model')
const EmployeeCheck = require('../models/employeeCheck.model')

exports.checkIn = async (idEmployee, comment) => {
  const employee = await Employee.findByPk(idEmployee)
  if (!employee) {
    throw createError(404, 'Employee not found')
  }

  const lastEmployeeCheckIn = await EmployeeCheck.findOne({
    where: {
      idEmployee,
    },
    order: [['checkIn', 'DESC']],
  })
  if (lastEmployeeCheckIn && !lastEmployeeCheckIn.checkOut) {
    throw createError(409, 'Not checked out yet')
  }
  const newCheckedIn = await EmployeeCheck.create({
    idEmployee,
    checkIn: new Date(),
    comment,
  })

  return newCheckedIn
}

exports.checkDifference = (checkOutDate, checkInDate) => {
  const checkOutDateMoment = moment(checkOutDate)
  const checkInDateMoment = moment(checkInDate)

  return moment.duration(checkOutDateMoment.diff(checkInDateMoment)).asMinutes()
}

exports.checkOut = async (idEmployee, comment) => {
  const employee = await Employee.findByPk(idEmployee)
  if (!employee) {
    throw createError(404, 'Employee not found')
  }

  const lastEmployeeCheckIn = await EmployeeCheck.findOne({
    where: {
      idEmployee,
      checkOut: null,
    },
    order: [['checkIn', 'DESC']],
  })
  if (!lastEmployeeCheckIn) {
    throw createError(409, 'Not checked in yet')
  }

  const checkOutDate = moment()

  const fieldToUpdate = {
    checkOut: checkOutDate.toDate(),
    checkDifference: moment
      .duration(checkOutDate.diff(moment(lastEmployeeCheckIn.checkIn)))
      .asMinutes(),
  }
  if (comment) {
    fieldToUpdate.comment = comment
  }

  const updatedEmployeeCheck = await EmployeeCheck.update(fieldToUpdate, {
    where: {
      idEmployee,
    },
  })

  return updatedEmployeeCheck
}
