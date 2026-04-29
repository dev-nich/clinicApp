const config = require("../utils/config");
const logger = require("../utils/logger");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

const schema = mongoose.Schema({
  appointment:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  patient:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  discount: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
    }],
  print_request: [
    { type: Date }
  ]
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Invoice", schema);
