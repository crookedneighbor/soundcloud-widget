'use strict'

var Promise = require('bluebird')
var widget = require('./vendor/soundcloud-widget')

function SoundcloudWidget (iframe) {
  this._widget = widget(iframe)
}

SoundcloudWidget.events = widget.Events

SoundcloudWidget.prototype.load = function (url, options) {
  return new Promise(function (resolve) {
    options = options || {}
    options.callback = resolve

    this._widget.load(url, options)
  }.bind(this))
}

SoundcloudWidget.prototype.on = applyFunction('bind')
SoundcloudWidget.prototype.bind = SoundcloudWidget.prototype.on
SoundcloudWidget.prototype.removeListener = applyFunction('unbind')
SoundcloudWidget.prototype.unbind = SoundcloudWidget.prototype.removeListener
SoundcloudWidget.prototype.play = applyFunction('play')
SoundcloudWidget.prototype.pause = applyFunction('pause')
SoundcloudWidget.prototype.toggle = applyFunction('toggle')
SoundcloudWidget.prototype.seekTo = applyFunction('seekTo')
SoundcloudWidget.prototype.setVolume = applyFunction('setVolume')
SoundcloudWidget.prototype.next = applyFunction('next')
SoundcloudWidget.prototype.prev = applyFunction('prev')
SoundcloudWidget.prototype.skip = applyFunction('skip')

SoundcloudWidget.prototype.getVolume = applyPromisifiedFunction('getVolume')
SoundcloudWidget.prototype.getDuration = applyPromisifiedFunction('getDuration')
SoundcloudWidget.prototype.getPosition = applyPromisifiedFunction('getPosition')
SoundcloudWidget.prototype.getSounds = applyPromisifiedFunction('getSounds')
SoundcloudWidget.prototype.getCurrentSound = applyPromisifiedFunction('getCurrentSound')
SoundcloudWidget.prototype.getCurrentSoundIndex = applyPromisifiedFunction('getCurrentSoundIndex')
SoundcloudWidget.prototype.isPaused = applyPromisifiedFunction('isPaused')

function applyFunction (originalName) {
  return function () {
    this._widget[originalName].apply(this._widget, arguments)
  }
}

function applyPromisifiedFunction (originalName) {
  return function () {
    return new Promise(function (resolve, reject) {
      this._widget[originalName](function (result) {
        resolve(result)
      })
    }.bind(this))
  }
}

module.exports = SoundcloudWidget
