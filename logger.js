const winston = require('winston')

const env = process.env.NODE_ENV || 'development'
const logLevel = env === 'development' ? 'debug' : 'info'
const logDir = global.appRoot
LOG = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      json: false,
      timestamp: true,
      colorize: true,
      level:logLevel
    })
  ]
})

module.exports = LOG