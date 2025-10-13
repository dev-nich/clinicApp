const assert = require('node:assert')
const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const Model = require('../models/person')
const User = require('../models/user')
const initialData = require('./person_api_mock_data')
const helper = require('../utils/test_helper')

const api = supertest(app) 
const route = '/api/persons'

describe('When there is one user in the DB', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      await Model.deleteMany({})
      await Model.insertMany(initialData)

    
      const passwordHash = await bcrypt.hash('123456', 10)
      const personObject = await Model.findOne({"first_name":"Test"})
      const person = personObject._id.toString()
      const user = new User({ username: 'test', passwordHash, person})
      await user.save()
    })

    test('Create new person', async () => {
      const dbCollection = await helper.allDbPersons()
  
      const newItem = {
        first_name: "New First Name",
        middle_name: "New Middle Name",
        last_name: "New Last Name",
        address: "New Address",
        contact: "00000000000",
        gender: "F",
        suffix: " "
      }
  
      await api
        .post('/api/persons')
        .send(newItem)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const newDbCollection = await helper.allDbPersons()
      assert.strictEqual(newDbCollection.length, dbCollection.length + 1)
  
      const firstName = newDbCollection.map(u => u.first_name)
      assert(firstName.includes(newItem.first_name))
    })

    test('Create existing person', async () => {
      const dbCollection = await helper.allDbPersons()
  
      const newItem = {
        first_name: "Test",
        middle_name: "Test",
        last_name: "Test",
        address: "New Address",
        contact: "00000000000",
        gender: "F",
        suffix: " ",
      }
  
      const response = await api
        .post('/api/persons')
        .send(newItem)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        assert(response.body.error.includes("person already exist"))

    })

    test('Update person', async () => {
      const dbCollection = await helper.allDbPersons()

      const firstItem = dbCollection[0]
      const newName = {
        first_name: "Updated First Name",
      }
  
      await api
        .patch(`/api/persons/${firstItem.id}`)
        .send(newName)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const newDbCollection = await helper.allDbPersons()
      assert.strictEqual(newDbCollection.length, dbCollection.length)
  
      const firstName = newDbCollection.map(u => u.first_name)
      assert(firstName.includes(newName.first_name))
    })

    test('Delete person', async () => {
      const dbCollection = await helper.allDbPersons()

      const firstItem = dbCollection[0]
  
      await api
        .delete(`/api/persons/${firstItem.id}`)
        .expect(204)
  
      const newDbCollection = await helper.allDbPersons()
      assert.strictEqual(newDbCollection.length, dbCollection.length - 1)
    })
})

after(async () => {
    await mongoose.connection.close()
})