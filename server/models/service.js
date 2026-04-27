const config = require("../utils/config");
const logger = require("../utils/logger");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
  },
  category: {
    type: [String],
  },
  products: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
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

module.exports = mongoose.model("Service", schema);
