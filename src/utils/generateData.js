const airports = require('../data/airports.json')

const DAY_OFFSET = 2
const TOTAL_SEATS = 300
const DAYS_IN_MONTH = 30
const MILLISECONDS_IN_SECOND = 1000
const MINUTES_IN_HOUR = 60
const MILLISECONDS_IN_DAY = 86400000
const MAX_PRICE_IN_USD = 1000
const USD_EUR_EXCHANGE_RATE = 0.91
const USD_RUB_EXCHANGE_RATE = 77.4
const USD_PLN_EXCHANGE_RATE = 4.15

const generateFlights = (count) => {
  const flights = []

  for (let i = 0; i < count; i++) {
    const flightNumber = `FL${(i + 1000).toString().padStart(4, '0')}`

    const fromAirport = airports[randomUpTo(airports.length)]
    let toAirport = airports[randomUpTo(airports.length)]

    // Ensure the toAirport is different from fromAirport
    while (toAirport === fromAirport) {
      toAirport = airports[randomUpTo(airports.length)]
    }

    for (let j = 1; j < 10; j++) {
      const takeoffDate = new Date(Date.now() + Math.floor(Math.random() * MILLISECONDS_IN_DAY * DAYS_IN_MONTH))
      const landingDate = new Date(takeoffDate.getTime() + Math.floor(Math.random() * MILLISECONDS_IN_DAY))
      const takeoffDateTo = new Date(takeoffDate.getTime() + MILLISECONDS_IN_DAY * DAY_OFFSET)
      const landingDateTo = new Date(landingDate.getTime() + MILLISECONDS_IN_DAY * DAY_OFFSET)
      const timeMins = Math.floor((landingDate - takeoffDate) / (MILLISECONDS_IN_SECOND * MINUTES_IN_HOUR))

      flights.push({
        from: fromAirport,
        to: toAirport,
        takeoffDate: takeoffDate.toISOString(),
        landingDate: landingDate.toISOString(),
        timeMins: timeMins,
        available: generateAvailableSeats(),
        price: generatePrices(),
        flightNumber: flightNumber,
      }, {
        from: toAirport,
        to: fromAirport,
        takeoffDate: takeoffDateTo.toISOString(),
        landingDate: landingDateTo.toISOString(),
        timeMins: timeMins,
        available: generateAvailableSeats(),
        price: generatePrices(),
        flightNumber: flightNumber,
      })
    }
  }

  return flights
}

function generatePrices() {
  const priceUSD = randomUpTo(MAX_PRICE_IN_USD)
  return {
    eur: (priceUSD * USD_EUR_EXCHANGE_RATE).toFixed(2),
    usd: priceUSD,
    rub: (priceUSD * USD_RUB_EXCHANGE_RATE).toFixed(2),
    pln: (priceUSD * USD_PLN_EXCHANGE_RATE).toFixed(2),
  }
}

function generateAvailableSeats() {
  return randomUpTo(TOTAL_SEATS)
}

function randomUpTo(max) {
  return Math.floor(Math.random() * max)
}

module.exports = { generateFlights }

