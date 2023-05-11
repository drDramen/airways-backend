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

function getUser(email, password) {
  return userDb.find(user => user.email === email && user.password === password)
}

function isAuthenticated(email, password ) {
  return userDb.findIndex(user => user.email === email && user.password === password) !== -1
}

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body
  const user = getUser(email, password)

  if (!user) {
    res.status(401).json({
      status: '401 - Login error',
      message: 'Incorrect email or password!',
    })
    return
  }
  const token = createToken({ email, password })
  res.status(200).json({ token, user })
})

server.post('/auth/registration', (req, res) => {
  const { email, password } = req.body
  const isAuthenticated = !!getUser(email, password)

  if (isAuthenticated) {
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

server.use('/auth/login', '/auth/registration', router)
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000')
})
