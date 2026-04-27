const router = require("express").Router();
const config = require("../utils/config");
const Model = require("../models/notification");
const Appt = require("../models/appointment");
const responses = require("../constants/responses");

router.get("/", async (request, response) => {
  const collection = await Model.find({});
  response.setHeader("X-Total-Count","10")
  response.setHeader("Access-Control-Expose-Headers","Content-Range")
  response.setHeader("Content-Range","bytes: 0-9/*")
  response.json(collection);
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

  const isApptExist = await Appt.findOne({_id:body.appointment})

  if(isApptExist === null){
    return response.status(400).json({ error: responses.ERR_APPT_INVALID })
  }

  const item = new Model(body);
  const savedItem = await item.save();

  response.status(201).json(savedItem).end();
});

router.get("/:id", async (request, response) => {
  const id = request.params.id.trim();

  const result = await Model.find({ _id: id });
  if (result) {
    result[0].id = result[0]._id.toString()
    response.json(result[0]);
  } else {
    response.status(404).end();
  }
});

router.post("/send", async (request, response) => {
    console.log("Received notification request:", request.body);
    if(request.body === undefined) {
        return response.status(400).send("Missing required fields");
    }

    const {to, subject, text, html} = request.body;

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(config.SENDGRID_API_KEY)

    const msg = {
        to: to || config.EMAIL, 
        from: config.EMAIL, 
        subject: subject || 'Clinic is open for business!',
        text: text || 'We are open for business! Please book your appointment now.',
        html: html || 'We are open for business! Please book your appointment <strong>now.</strong>',
    }

    sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
    })
    .catch((error) => {
        console.error(error)
    })


    response.status(200).send("Notification sent successfully");
});

router.put("/:id", async (request, response) => {
    console.log("Received notification request:", request.body);

    if(request.body === undefined) {
        return response.status(400).send("Missing required fields");
    }

    const {to, subject, text, html, status} = request.body;

    if(status && status === 'sending'){
      const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(config.SENDGRID_API_KEY)

    const msg = {
        to: to || config.EMAIL, 
        from: config.EMAIL, 
        subject: subject || 'Clinic is open for business!',
        text: text || 'We are open for business! Please book your appointment now.',
        html: html || 'We are open for business! Please book your appointment <strong>now.</strong>',
    }

    sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
    })
    .catch((error) => {
        console.error(error)
    })


     response.status(200).send("Notification sent successfully");
    }

    const id = request.params.id;
      const body = request.body;
      const result = await Model.findOneAndUpdate({ _id: { $eq: id } }, body, {
        new: true,
      });
      response.status(200).json(result);

    
});

module.exports = router;
