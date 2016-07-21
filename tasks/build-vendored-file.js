'use strict'

var fs = require('fs')
var request = require('request')

request.get('https://w.soundcloud.com/player/api.js', function (err, res) {
  if (err) {
    console.error(err)
    return
  }

  var file = res.body + '\nmodule.exports = SC.Widget'
  fs.writeFileSync('./vendor/soundcloud-widget.js', file)
})
