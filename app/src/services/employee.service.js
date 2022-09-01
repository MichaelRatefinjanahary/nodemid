const Employee = require('../models/employee.model')

exports.create = async (data) => {
  const employee = await Employee.create(data)
  return employee
}

exports.findAll = async (query) => {
  const { dateCreated } = query

  const condition = {}

  if (dateCreated) {
    condition.dateCreated = dateCreated
  }

  const employees = await Employee.findAll({
    where: condition,
  })
  return employees
}
