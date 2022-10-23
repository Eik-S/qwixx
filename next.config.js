const withPWA = require('next-pwa')({
  dest: 'public',
  scope: '/',
})

module.exports = withPWA({
  // next.js config
})
