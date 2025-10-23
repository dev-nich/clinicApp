const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const router = require("express").Router();
const Model = require("../models/appointment");
const Employee = require("../models/employee");
const Patient = require("../models/patient");
const responses = require("../constants/responses");

router.get("/", async (request, response) => {
  const filter = request.query.filter ? JSON.parse(request.query.filter) : {}
  const collection = await Model.find({}).populate(filter.populate ?? "")
  response.setHeader("X-Total-Count","10")
  response.setHeader("Access-Control-Expose-Headers","Content-Range")
  response.setHeader("Content-Range","bytes: 0-9/*")
  response.json(collection);
});

router.get("/:id", async (request, response) => {
  const id = request.params.id.trim();

  const result = await Model.find({ _id: id })
  if (result) {
    result[0].id = result[0]._id.toString()
    response.json(result[0]);
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

  const isPatientExist = await Patient.findOne({_id:body.patient})
  const isEmployeeExist = await Employee.findOne({_id:body.created_by})

  if(isPatientExist === null){
    return response.status(400).json({ error: responses.ERR_PERSON_INVALID })
  }

  if(isEmployeeExist === null){
    return response.status(400).json({ error: responses.ERR_EMPLOYEE_INVALID })
  }


  const item = new Model(body);
  const savedItem = await item.save();

  response.status(201).json(savedItem).end();
});

router.post("/clean", async (request, response) => {
  await Model.deleteMany({});
  response.json(200).end;
});

router.put("/:id", async (request, response) => {
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
