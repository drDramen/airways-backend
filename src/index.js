const airports = require('./data/airports.json')
const phoneCodes = require('./data/phone-codes.json')
const { generateFlights } = require('./utils/generateData')

module.exports = () => {
  return {
    airports: airports,
    flights: generateFlights(30),
    'phone-codes': phoneCodes
  }
}
