const config = require("../utils/config");
const logger = require("../utils/logger");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

const medicationsSchema = mongoose.Schema({
  description: { type: String, required: true },
  start_date: { type: Date},
  end_date: { type: Date},
});

const allergiesSchema = mongoose.Schema({
  description: { type: String, required: true },
  start_date: { type: Date},
  end_date: { type: Date},
});

const medicalHistorySchema = mongoose.Schema({
  description: { type: String, required: true },
  start_date: { type: Date},
  end_date: { type: Date},
});

const familyHistorySchema = mongoose.Schema({
  description: { type: String, required: true },
  start_date: { type: Date},
  end_date: { type: Date},
});

const schema = mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  medications: [medicationsSchema],
  allergies: [allergiesSchema],
  medical_history: [medicalHistorySchema],
  family_history: [familyHistorySchema],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Patient", schema);
