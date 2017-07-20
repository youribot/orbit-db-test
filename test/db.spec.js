var assert = require('assert')
var chai = require('chai')
var db = require('../src/db')

var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

var dbname = 'oiobo.db.users'
var indexBy = 'alias'

var user = {
  email: 'nik@light.com',
  pass: '1234',
  alias: 'niksmac'
}

describe('db', function () {
  describe('create', function () {
    it('shuld return orbit instance', function () {
      db.createDb(dbname, indexBy).should.be.a('object')
    })

    it('shuld return key dbname', function () {
      var dbObj = db.createDb(dbname, indexBy)
      dbObj.should.have.property('dbname')
    })
  })

  describe('user', function () {
    it('shuld return ipfs hash', function () {
      db.saveUser(user).should.eventually.have.length(46)
    })

    // it('should be able to login using test data', function () {
    //   db.authenticateUser(user.email, user.pass).should.have.property('alias')
    // })
  })
})
