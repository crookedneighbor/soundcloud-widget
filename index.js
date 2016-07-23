'use strict'

var Promise = require('bluebird')
var widget = require('./vendor/soundcloud-widget')

var WIDGET_METHODS = Object.freeze([
  'play',
  'pause',
  'toggle',
  'seekTo',
  'setVolume',
  'next',
  'prev',
  'skip'
])
var WIDGET_METHODS_WITH_CALLBACKS = Object.freeze([
  'getVolume',
  'getDuration',
  'getPosition',
  'getSounds',
  'getCurrentSound',
  'getCurrentSoundIndex',
  'isPaused'
])

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

WIDGET_METHODS.forEach(function (method) {
  SoundcloudWidget.prototype[method] = applyFunction(method)
})

WIDGET_METHODS_WITH_CALLBACKS.forEach(function (method) {
  SoundcloudWidget.prototype[method] = applyPromisifiedFunction(method)
})

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
