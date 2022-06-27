const Sentry = require('@sentry/node')
const LOG = require('./logger')
const BetterDedupe = require("./better_dedupe")

const dedupeIntegration = new BetterDedupe()

const ExceptionReporter = {
  init(options = {}) {
    if (!debugMode) {
      let defaultOptions = { 
        dsn: 'https://6704b18228504e94b4d937f549a6f48b@o265014.ingest.sentry.io/5578845',
        integrations: [dedupeIntegration]
      }
      let settings = Object.assign({}, defaultOptions, options)
      Sentry.init(settings)
    }

    // very basic message based duplication detection 
    // (avoid sentry stack parsing which consume CPU)
    this.pastExceptionMap = {}
    
    this.initialized = true
  },
  getDedupeInstance() {
    return dedupeIntegration
  },
  getSentryInstance() {
    return Sentry
  },
  captureException(e) {
    if (!this.initialized) this.init()

    if (debugMode) {
      LOG.error(e)
    }

    if (this.isDuplicate(e)) {
      this.incrementPastExceptionCount(e)
    } else {
      this.registerPastException(e)

      if (!debugMode) {
        Sentry.captureException(e)
      }
    }
  },
  isDuplicate(e) {
    return this.pastExceptionMap[e.message]
  },
  registerPastException(e) {
    this.pastExceptionMap[e.message] = { error: e, count: 1 }
  },
  incrementPastExceptionCount(e) {
    if (this.pastExceptionMap[e.message].count < 1000) {
      this.pastExceptionMap[e.message].count = this.pastExceptionMap[e.message].count + 1
    }
  }
}

module.exports = ExceptionReporter