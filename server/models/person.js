const config = require('../utils/config')
const logger = require('../utils/logger')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

mongoose.connect(url)
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const schema = mongoose.Schema({
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    suffix: {
      type: String,
      default: "",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    }
  })

  schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('Person', schema)