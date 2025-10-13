const User = require('../models/user')
const Person = require('../models/person')

const allDbUsers = async () => {
    const collection = await User.find({})
    return collection.map(u => u.toJSON())
}

const allDbPersons = async () => {
    const collection = await Person.find({})
    return collection.map(u => u.toJSON())
}


module.exports = {
    allDbUsers,
    allDbPersons
}