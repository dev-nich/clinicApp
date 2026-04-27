const config = require("../utils/config");
const logger = require("../utils/logger");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;

mongoose.connect(url).catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
});

const schema = mongoose.Schema({
  product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      require:true,
    },
  supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suppliers",
      require:true,
    },
  quantity: {
    type: Number,
    default: 0,
    require:true,
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Inventories", schema);
