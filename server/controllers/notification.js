const router = require("express").Router();
const config = require("../utils/config");
const Model = require("../models/notification");

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

module.exports = router;
