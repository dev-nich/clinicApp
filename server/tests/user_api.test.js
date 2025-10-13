const assert = require('node:assert')
const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const Model = require('../models/user')
const Person = require('../models/person')
const initialUser = require('./user_api_mock_data')
const helper = require('../utils/test_helper')


const api = supertest(app) 
const route = '/api/users'

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await Model.deleteMany({})

      const personObj = new Person({
          first_name: "User First Name",
          middle_name: "User Middle Name",
          last_name: "User Last Name",
          address: "User Address",
          contact: "00000000000",
          gender: "F",
          suffix: " "
        })

      await personObj.save()
      
    })

    test('create new user', async () => {
      const usersAtStart = await helper.allDbUsers()

      const person = await Person.findOne({"first_name":"User First Name"})
      const newUser = { username: 'root', password: '123456', person: person._id }
      
      await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.allDbUsers()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('username already exist', async () => {
      const usersAtStart = await helper.allDbUsers()

      const person = await Person.findOne({"first_name":"User First Name"})
      const newUser = { username: 'root', password: '123456', person: person._id }

      const mappedInitialUsers = initialUser.map((user)=>{
          user.person = person._id
          return user
      })

      await Model.insertMany(mappedInitialUsers)

      const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      
      assert(response.body.error.includes("expected `username` to be unique"))
    })

    test('invalid username', async () => {
      const person = await Person.findOne({"first_name":"User First Name"})
      const newUser = { username: 'r', password: '123456', person: person._id }
      const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      
      assert(response.body.error.includes("is shorter than the minimum allowed length (3)"))
    })

    test('invalid password', async () => {
      const person = await Person.findOne({"first_name":"User First Name"})
      const newUser = { username: 'rootnew', password: '12', person: person._id }
      const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      
      assert(response.body.error.includes("is shorter than the minimum allowed length (3)"))
    })
  })

after(async () => {
    await mongoose.connection.close()
})