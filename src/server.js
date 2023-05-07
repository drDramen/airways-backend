const path = require('path')
const fs = require('fs')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const generateDb = require('./index')

const server = jsonServer.create()
const router = jsonServer.router(generateDb())
const userDb = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json'), 'utf-8'))

server.use(jsonServer.defaults())
server.use(jsonServer.bodyParser)

const SECRET_KEY = '123456789'
const expiresIn = '10h'

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => {
    if (err) {
      throw new Error()
    }

    return decode
  })
}

function isAuthenticated({ email, password }) {
  return userDb.findIndex(user => user.email === email && user.password === password) !== -1
}

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body
  if (isAuthenticated({ email, password }) === false) {
    res.status(401).json({
      status: '401 - Login error',
      message: 'Incorrect email or password!',
    })
    return
  }
  const token = createToken({ email, password })
  res.status(200).json({ token })
})

server.post('/auth/registration', (req, res) => {
  const { email, password } = req.body
  if (isAuthenticated({ email, password }) === true) {
    res.status(400).json({
      status: '400 - Register error',
      message: 'User already exists!',
    })
    return
  }
  const newUser = { ...req.body }
  userDb.push(newUser)
  res.status(200).json(newUser)
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ')
    if (!token) {
      throw new Error()
    }
    verifyToken(token)
    next()
  } catch (err) {
    res.status(401).json({
      status: '401 - Access error',
      message: 'You must be log in before access this page!',
    })
  }
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000')
})
