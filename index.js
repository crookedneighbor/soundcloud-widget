'use strict'

var Promise = require('bluebird')
var widget = require('./vendor/soundcloud-widget')

function SoundcloudWidget (iframe) {
  this._widget = widget(iframe)
}

SoundcloudWidget.events = widget.Events

SoundcloudWidget.prototype.on = applyFunction('bind')
SoundcloudWidget.prototype.bind = SoundcloudWidget.prototype.on
SoundcloudWidget.prototype.removeListener = applyFunction('unbind')
SoundcloudWidget.prototype.unbind = SoundcloudWidget.prototype.removeListener
SoundcloudWidget.prototype.load = applyFunction('load')
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
    var originalFunction = this._widget[originalName]

    return new Promise(function (resolve, reject) {
      originalFunction(function (result) {
        resolve(result)
      })
    })
  }
}

module.exports = SoundcloudWidget
