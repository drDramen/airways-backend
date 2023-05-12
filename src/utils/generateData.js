const airports = require('../data/airports.json')

const INITIAL_FLIGHT_NUMBER = 1001
const TOTAL_SEATS = 300
const MILLISECONDS_IN_SECOND = 1000
const MILLISECONDS_IN_HOUR = 3600000
const MILLISECONDS_IN_HALF_HOUR = MILLISECONDS_IN_HOUR / 2
const HOUR_IN_DAY = 24
const MINUTES_IN_HOUR = 60
const SECONDS_IN_MINUTE = 60
const MILLISECONDS_IN_DAY = 86400000
const MIN_PRICE_IN_USD = 4
const MAX_PRICE_IN_USD = 1000
const USD_EXCHANGE_RATES = {
  EUR: 0.91, RUB: 77.4, PLN: 4.15,
}

const generateFlights = (numDays) => {
  const flights = []
  const today = new Date()

  for (let i = 0; i < airports.length; i++) {
    for (let j = i + 1; j < airports.length; j++) {
      const flightNumber = `FL${(i + INITIAL_FLIGHT_NUMBER).toString().padStart(4, '0')}`

      for (let k = 0; k < numDays; k++) {
        const date = new Date(today.getTime() + k * MILLISECONDS_IN_DAY)
        flights.push(generateFlight(airports[i], airports[j], date, flightNumber), generateFlight(airports[j], airports[i], date, flightNumber))
      }
    }
  }

  return flights
}

function generateFlight(from, to, date, flightNumber) {
  const [takeoffDate, landingDate] = generateFlightDates(date)
  const timeMins = Math.floor((landingDate - takeoffDate) / (MILLISECONDS_IN_SECOND * MINUTES_IN_HOUR))

  return {
    from: from,
    to: to,
    takeoffDate: takeoffDate.toLocaleString(),
    landingDate: landingDate.toLocaleString(),
    timeMins: timeMins,
    available: generateAvailableSeats(),
    price: generatePrices(),
    flightNumber: flightNumber,
  }
}

function generatePrices() {
  const priceUSD = getRandomNumber(MIN_PRICE_IN_USD, MAX_PRICE_IN_USD)
  const prices = { USD: priceUSD }
  for (const [currency, rate] of Object.entries(USD_EXCHANGE_RATES)) {
    prices[currency] = (priceUSD * rate).toFixed(2)
  }
  return prices
}

function generateAvailableSeats() {
  return getRandomNumber(0, TOTAL_SEATS)
}


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateFlightDates(date) {
  const takeoffDate = getRandomDateWithTime(date)
  const landingDate = new Date(takeoffDate.getTime() + getRandomNumber(MILLISECONDS_IN_HALF_HOUR, MILLISECONDS_IN_DAY))
  return [takeoffDate, landingDate]
}

function getRandomDateWithTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), getRandomNumber(0, HOUR_IN_DAY), getRandomNumber(0, MINUTES_IN_HOUR), getRandomNumber(0, SECONDS_IN_MINUTE))
}

module.exports = { generateFlights }

