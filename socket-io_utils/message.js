function formatMsg(username, message) {
  return {
      username,
      message,
      time: new Date().toLocaleTimeString()
  }
}

module.exports = formatMsg