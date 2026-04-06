require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test' 
? process.env.TEST_MONGODB_URI
: process.env.MONGODB_URI

const SECRET = process.env.SECRET

const ENV = process.env.NODE_ENV

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const EMAIL = process.env.EMAIL

module.exports = {
    MONGODB_URI,
    SECRET,
    ENV,
    SENDGRID_API_KEY,
    EMAIL
}