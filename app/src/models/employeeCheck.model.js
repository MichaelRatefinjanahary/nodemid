const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Model = Sequelize.Model

class EmployeeCheck extends Model {}

EmployeeCheck.init(
  {
    idEmployee: {
      type: Sequelize.INTEGER,
      references: {
        model: 'employees',
        key: 'id',
      },
    },
    checkIn: {
      type: Sequelize.DATE,
    },
    checkOut: {
      type: Sequelize.DATE,
    },
    comment: {
      type: Sequelize.STRING,
    },
    checkDifference: {
      type: Sequelize.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'employeeCheck',
    timestamps: false,
  }
)

module.exports = EmployeeCheck
