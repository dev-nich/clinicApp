//const logger = require('./logger')
const morgan = require('morgan')

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({error: 'token expired'})
  }

  // eslint-disable-next-line no-unreachable
  next(error)
}

const tokenExtractor = (request, response, next) => {
  request.token = null
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
     request.token = authorization.replace('Bearer ', '')
  }

  next()
}


module.exports = {
  morganLogger,
  errorHandler,
  tokenExtractor
}