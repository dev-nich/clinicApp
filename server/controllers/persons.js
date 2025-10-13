const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const router = require('express').Router()
const Model = require('../models/person')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const collection = await Model.find({})
  response.json(collection)
})

router.get('/:id', async (request, response) => {
  const id = request.params.id.trim()

  const result = await Model.find({_id:id})
  if(result){
    response.json(result)
  }else{
    response.status(404).end()
  }
})

router.post('/safe', async (request, response) => {
    const body = request.body
    const item = new Model(body)

    const savedItem = await item.save()

    response
    .status(201)
    .json(savedItem)
    .end()
})

router.post('/', async (request, response) => {
    const body = request.body
    if(config.ENV !== 'test'){
      const decodedToken = jwt.verify(request.token, config.SECRET)
      if (!decodedToken.id) {
        return response.status(400).json({ error: 'token invalid' })
      }
      const user = await User.findById(decodedToken.id)

      if (!user) {
        return response.status(400).json({ error: 'userId missing or not valid' })
      }
    }

    const isExist = await Model.find({
      first_name: body.first_name,
      middle_name: body.middle_name,
      last_name: body.last_name,
      suffix: body.suffix,
    })

    console.log(isExist)

    if(isExist.length !== 0){
      return response.status(400).json({ error: 'person already exist' })
    }
  
    const item = new Model(body)
    const savedItem = await item.save()

    response
    .status(201)
    .json(savedItem)
    .end()
})

router.post('/clean', async (request, response) => {
   await Model.deleteMany({})
  response.json(200).end
})

router.patch('/:id', async (request, response) => {
  if(config.ENV !== 'test'){
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
      return response.status(400).json({ error: 'token invalid' })
    }
  }

  const id = request.params.id
  const body = request.body
  const result = await Model.findOneAndUpdate({_id:{$eq:id}},body, {new:true})
  response
    .status(200)
    .json(result)
})

router.delete('/:id', async (request, response) => {
  if(config.ENV !== 'test'){
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
      return response.status(400).json({ error: 'token invalid' })
    }
  }

  const id = request.params.id
  const result = await Model.findOneAndDelete({_id:{$eq:id}})
  
  const formattedId = result._id.toString()
  return response
    .status(204)
    .json(result ? {id:formattedId} : null)
    .end()
})
 
module.exports = router