
if (process.env.PACK_ENV === 'production') {
  module.exports = require('./constant-prod')
} else if (process.env.PACK_ENV === 'development') {
	module.exports = require('./constant-dev')
} else {
  module.exports = require('./constant-local')
}
