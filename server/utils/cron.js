const Position = require("../models/position")

const checkHealth = async () => {
    return await Position.findOne({});
}



module.exports = { checkHealth }