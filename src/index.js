const airports = require('./data/airports.json')
const { generateFlights } = require('./utils/generateData')

module.exports = () => {
  return {
    airports: airports,
    flights: generateFlights(200),
  }
}
