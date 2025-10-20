const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const router = require("express").Router();
const Model = require("../models/employee");
const User = require("../models/user");
const Position = require("../models/position");
const Person = require("../models/person");
const responses = require("../constants/responses");

router.get("/", async (request, response) => {
  const collection = await Model.find({}).populate("person").populate("position");
  response.json(collection);
});

router.get("/:id", async (request, response) => {
  const id = request.params.id.trim();

  const result = await Model.find({ _id: id }).populate("person").populate("position")
  if (result) {
    response.json(result);
  } else {
    response.status(404).end();
  }
});

router.post("/", async (request, response) => {
  const body = request.body;
  if (config.ENV !== "test") {
    const decodedToken = jwt.verify(request.token, config.SECRET);
    if (!decodedToken.id) {
      return response.status(400).json({ error: responses.ERR_TOKEN_INVALID });
    }
    const user = await User.findById(decodedToken.id);
  }

  const isPersonExist = await Person.findOne({_id:body.person})
  const isPositionExist = await Position.findOne({_id:body.position})

  if(isPersonExist === null){
    return response.status(400).json({ error: responses.ERR_PERSON_INVALID })
  }

  if(isPositionExist === null){
    return response.status(400).json({ error: responses.ERR_POSITION_INVALID })
  }


  const item = new Model(body);
  const savedItem = await item.save();

  response.status(201).json(savedItem).end();
});

router.post("/clean", async (request, response) => {
  await Model.deleteMany({});
  response.json(200).end;
});

router.patch("/:id", async (request, response) => {
  if (config.ENV !== "test") {
    const decodedToken = jwt.verify(request.token, config.SECRET);
    if (!decodedToken.id) {
      return response.status(400).json({ error: responses.ERR_TOKEN_INVALID });
    }
  }

  const id = request.params.id;
  const body = request.body;
  const result = await Model.findOneAndUpdate({ _id: { $eq: id } }, body, {
    new: true,
  });
  response.status(200).json(result);
});

router.delete("/:id", async (request, response) => {
  if (config.ENV !== "test") {
    const decodedToken = jwt.verify(request.token, config.SECRET);
    if (!decodedToken.id) {
      return response.status(400).json({ error: responses.ERR_TOKEN_INVALID  });
    }
  }

  const id = request.params.id;
  const result = await Model.findOneAndDelete({ _id: { $eq: id } });

  const formattedId = result._id.toString();
  return response
    .status(204)
    .json(result ? { id: formattedId } : null)
    .end();
});

module.exports = router;
