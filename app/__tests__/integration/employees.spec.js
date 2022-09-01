const request = require('supertest')
const app = require('../../src/app')
const Employee = require('../../src/models/employee.model')
const sequelize = require('../../src/config/database')
const employees = require('../../fixtures/employees.fixture')

beforeAll(() => {
  return sequelize.sync({ force: true })
})

afterAll(() => {
  return sequelize.close()
})

describe('Testing employees CRUD API', () => {
  describe('Creating new employee', () => {
    beforeEach(() => {
      return Employee.destroy({ truncate: true })
    })

    const postNewEmployee = () => {
      return request(app).post('/api/employees').send({
        name: 'Brown',
        firstName: 'Richard',
        department: 'Computer engineering',
      })
    }

    it('returns 201 when a new employee is created', async () => {
      const response = await postNewEmployee()
      expect(response.status).toBe(201)
    })

    it('returns newly created employee', async () => {
      const response = await postNewEmployee()
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
        })
      )
      expect(response.body.name).toBe('Brown')
      expect(response.body.firstName).toBe('Richard')
      expect(response.body.department).toBe('Computer engineering')
    })

    it('saves the newly created employee into the database', async () => {
      await postNewEmployee()
      const employees = await Employee.findAll()
      expect(employees.length).toBe(1)
    })
  })

  describe('Retrieving employees', () => {
    beforeAll(async () => {
      await Employee.destroy({ truncate: true })
      return Employee.bulkCreate(employees)
    })

    it('returns 200 OK when retrieving all employees', async () => {
      const response = await request(app).get('/api/employees')
      expect(response.status).toBe(200)
    })

    it('returns array of employees', async () => {
      const response = await request(app).get('/api/employees')
      expect(response.body).toEqual(expect.any(Array))
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ])
      )
    })

    it('returns array of employees with dateCreated filter applied', async () => {
      const response = await request(app).get(`/api/employees?dateCreated=${'2021-12-05'}`)
      expect(response.body).toEqual(expect.any(Array))
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ])
      )
    })

    it('returns an empty array if no employees found', async () => {
      const response = await request(app).get(`/api/employees?dateCreated=${'2021-12-06'}`)
      expect(response.body).toEqual(expect.any(Array))
      expect(response.body.length).toBe(0)
    })
  })
})
