const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Model = Sequelize.Model

class Employee extends Model {}

Employee.init(
  {
    name: {
      type: Sequelize.STRING,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    department: {
      type: Sequelize.STRING,
    },
    dateCreated: {
      type: Sequelize.DATEONLY,
      defaultValue: new Date(),
    },
  },
  {
    sequelize,
    modelName: 'employee',
    timestamps: false,
  }
)

module.exports = Employee