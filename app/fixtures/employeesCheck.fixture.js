const moment = require('moment')

module.exports = [
  {
    id: 1,
    idEmployee: 3,
    checkIn: moment().startOf('days').add(8, 'hours').toISOString(),
    checkOut: null,
    comment: 'Comment',
  },
]
