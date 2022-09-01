const request = require('supertest')
const app = require('../../src/app')
const sequelize = require('../../src/config/database')
const Employee = require('../../src/models/employee.model')
const EmployeeCheck = require('../../src/models/employeeCheck.model')
const employees = require('../../fixtures/employees.fixture')
const employeesCheck = require('../../fixtures/employeesCheck.fixture')

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await Employee.bulkCreate(employees)
  return EmployeeCheck.bulkCreate(employeesCheck)
})

afterAll(() => {
  return sequelize.close()
})

describe('Testing employees check API', () => {
  const postEmployeeCheck = (type, idEmployee) => {
    return request(app).post(`/api/${type}/${idEmployee}`).send({
      comment: 'Comment',
    })
  }

  it('returns 200 OK when an employee check in', async () => {
    const response = await postEmployeeCheck('check-in', 1)
    expect(response.status).toBe(200)
  })

  it('returns 200 OK when an employee check out', async () => {
    const response = await postEmployeeCheck('check-out', 3)
    expect(response.status).toBe(200)
  })

  it('returns 404 if employeeId incorrect in ckech-in', async () => {
    const response = await postEmployeeCheck('check-in', 999)
    expect(response.status).toBe(404)
  })

  it('returns 404 if employeeId incorrect in ckech-out', async () => {
    const response = await postEmployeeCheck('check-out', 999)
    expect(response.status).toBe(404)
  })

  it('returns 409 if an employee has already checked-in but not checked-out yet', async () => {
    const response = await postEmployeeCheck('check-out', 3)
    expect(response.status).toBe(409)
  })

  it('returns 409 if an employee checked-out but not checked-in yet', async () => {
    const response = await postEmployeeCheck('check-out', 2)
    expect(response.status).toBe(409)
  })
})
