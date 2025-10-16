const User = require('../models/user')
const Person = require('../models/person')
const Employee = require('../models/employee')
const Position = require('../models/position')
const Patient = require('../models/patient')
const Access = require('../models/access')

const allDbUsers = async () => {
    const collection = await User.find({})
    return collection.map(u => u.toJSON())
}

const allDbPersons = async () => {
    const collection = await Person.find({})
    return collection.map(u => u.toJSON())
}

const allDbEmployees = async () => {
    const collection = await Employee.find({})
    return collection.map(u => u.toJSON())
}

const allDbPositions = async () => {
    const collection = await Position.find({})
    return collection.map(u => u.toJSON())
}

const allDbPatients = async () => {
    const collection = await Patient.find({})
    return collection.map(u => u.toJSON())
}

const allDbAccess = async () => {
    const collection = await Access.find({})
    return collection.map(u => u.toJSON())
}

module.exports = {
    allDbUsers,
    allDbPersons,
    allDbEmployees,
    allDbPositions,
    allDbPatients,
    allDbAccess
}