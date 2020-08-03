const moment = require("moment");

function formatMsg(sender, message) {
  return {
    sender,
    message,
    time: moment().format("h:mm a"),
  };
}

module.exports = formatMsg;
