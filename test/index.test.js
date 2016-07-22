var SoundcloudWidget = require('../')
var scWidget = require('../vendor/soundcloud-widget')
var Promise = require('bluebird')

describe('SoundcloudWidget', function () {
  beforeEach(function () {
    this.iframe = document.createElement('iframe')
    this.iframe.id = 'soundcloud-iframe'
    this.iframe.src = 'https://soundcloud.com/soundcloud'
    document.body.appendChild(this.iframe)
  })

  afterEach(function () {
    document.body.removeChild(this.iframe)
  })

  describe('Constructor', function () {
    it('can create a new widget with an id', function () {
      expect(function () {
        var widget = new SoundcloudWidget('soundcloud-iframe') // eslint-disable-line no-unused-vars
      }).to.not.throw()
    })

    it('can create a new widget with a DOM node', function () {
      expect(function () {
        var widget = new SoundcloudWidget(this.iframe) // eslint-disable-line no-unused-vars
      }.bind(this)).to.not.throw()
    })

    it('will error if iframe does not exist', function () {
      expect(function () {
        var widget = new SoundcloudWidget('non-existant-id') // eslint-disable-line no-unused-vars
      }).to.throw()
    })
  })

  describe('events', function () {
    it('is the scWidget\'s events', function () {
      expect(SoundcloudWidget.events).to.equal(scWidget.Events)
    })
  })

  describe('#on', function () {
    beforeEach(function () {
      this.widget = new SoundcloudWidget(this.iframe)
    })

    it('outsources to scWidget\'s bind', function () {
      this.sandbox.spy(this.widget._widget, 'bind')

      var event = 'EVENT'
      var callback = function () {}

      this.widget.on(event, callback)

      expect(this.widget._widget.bind).to.be.calledOnce
      expect(this.widget._widget.bind).to.be.calledWith(event, callback)
    })

    it('is aliased to bind', function () {
      expect(this.widget.on).to.equal(this.widget.bind)
    })
  })

  describe('#removeListener', function () {
    beforeEach(function () {
      this.widget = new SoundcloudWidget(this.iframe)
    })

    it('outsources to scWidget\'s unbind', function () {
      this.sandbox.spy(this.widget._widget, 'unbind')

      var event = 'EVENT'

      this.widget.removeListener(event)

      expect(this.widget._widget.unbind).to.be.calledOnce
      expect(this.widget._widget.unbind).to.be.calledWith(event)
    })

    it('is aliased to unbind', function () {
      expect(this.widget.removeListener).to.equal(this.widget.unbind)
    })
  })

  describe('#load', function () {
    beforeEach(function () {
      this.widget = new SoundcloudWidget(this.iframe)
      this.sandbox.stub(this.widget._widget, 'load', function (url, options) {
        options.callback()
      })
    })

    it('outsources to scWidget\'s load', function (done) {
      var url = 'url'
      var options = {foo: 'bar'}

      this.widget.load(url, options).then(() => {
        expect(this.widget._widget.load).to.be.calledOnce
        expect(this.widget._widget.load).to.be.calledWith(url, options)
        done()
      })
    })

    it('is a promise that resolves when loading is complete', function (done) {
      var url = 'url'
      var options = {foo: 'bar'}

      var promise = this.widget.load(url, options)

      expect(promise).to.be.an.instanceOf(Promise)

      promise.then(done)
    })

    it('does not require an options argument', function (done) {
      var url = 'url'

      var promise = this.widget.load(url)

      promise.then(done)
    })
  })

  describe('scWidget passthrough methods', function () {
    var methods = [
      'play',
      'pause',
      'toggle',
      'seekTo',
      'setVolume',
      'next',
      'prev',
      'skip'
    ]

    methods.forEach(function (method) {
      it('uses scWidget\'s ' + method, function () {
        this.widget = new SoundcloudWidget(this.iframe)
        this.sandbox.stub(this.widget._widget, method)

        var arg = {value: 'arg'}

        this.widget[method](arg)

        expect(this.widget._widget[method]).to.be.calledOnce
        expect(this.widget._widget[method]).to.be.calledWith(arg)
      })
    })
  })

  describe('scWidget promisified methods', function () {
    var methods = [
      'getVolume',
      'getDuration',
      'getPosition',
      'getSounds',
      'getCurrentSound',
      'getCurrentSoundIndex',
      'isPaused'
    ]

    methods.forEach(function (method) {
      it('promisifies scWidget\'s ' + method, function (done) {
        var res = {value: 'foo'}

        this.widget = new SoundcloudWidget(this.iframe)
        this.sandbox.stub(this.widget._widget, method).yields(res)

        var promise = this.widget[method]()

        expect(promise).to.be.an.instanceOf(Promise)

        promise.then((result) => {
          expect(result).to.equal(res)
          expect(this.widget._widget[method]).to.be.calledOnce
          done()
        }).catch(done)
      })
    })
  })
})