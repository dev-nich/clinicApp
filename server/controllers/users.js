const bcrypt = require('bcrypt')
const router = require('express').Router()
const Model = require('../models/user')
const Person = require('../models/person')


router.get('/', async (request, response) => {
  const collection = await Model.find({}).populate("person")
  response.json(collection)
})

router.get('/:id', async (request, response) => {
  const id = request.params.id.trim()

  const result = await Model.find({_id:id}).populate("person")

  if(result){
    response.json(result)
  }else{
    response.status(404).end()
  }
})

router.post('/', async (request, response) => {
    const { username, password, person } = request.body

    const findPerson = await Person.find({_id:person})

    if(findPerson.length === 0){
      return response.status(400).json({error: 'person not found'})
    }

    if(password.length < 3){
      return response.status(400).json({error: 'password is shorter than the minimum allowed length (3)'})
    }
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const item = new Model({
      username,
      passwordHash,
      person
    })
  
    const savedItem = await item.save()
    response.status(201).json(savedItem)
  })
  
  router.post('/clean', async (request, response) => {
     await Model.deleteMany({})
    response.json(200).end
  })
  
  module.exports = router