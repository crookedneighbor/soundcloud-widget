var chai = require('chai')
var sinon = require('sinon')

chai.use(require('sinon-chai'))

global.expect = chai.expect

before(function () {
  this.sandbox = sinon.sandbox.create()
})

afterEach(function () {
  this.sandbox.restore()
})
