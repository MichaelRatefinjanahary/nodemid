const EmployeeCheckService = require('../../src/services/employeeCheck.service')

describe('Testing employees check service', () => {
  it('should have difference in minutes of check-out and check-in', async () => {
    const minutes = EmployeeCheckService.checkDifference(new Date('2022-08-28 12:00'), new Date('2022-08-28 08:00'))
    expect(minutes).toBe(240)
  })
})
