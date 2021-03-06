// Enable ES2018 support
require('babel-register')

// Bootstrap core
require('./logger')
require('./polyfills')
require('./globals')

// Ignore files on server render
require.extensions['.scss'] = function() {
  return
}

require('../server/server')
