import  
const config = require("../utils/config");
const logger = require("../utils/logger");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

const schema = mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  subject: {
    type: String,
  },
  to: {
    type: String,
  },
  text: {
    type: String,
  },
  html: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "sent", "failed"],
    default: "pending",
  },
  type: {
    type: String,
    enum: ["email", "sms"],
    default: "email",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

schema.pre("save", function(next){
  // TODO: trigger notification here

  next();
})

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Notification", schema);
