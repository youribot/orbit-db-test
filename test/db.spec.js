var assert = require('assert')
var chai = require('chai')
var db = require('../src/db')

var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()
var expect = chai.expect
var dbname = 'oiobo.db.users'
var indexBy = 'alias'
var dbObj = db.createDb(dbname, indexBy)

var user = {
  email: 'nik@light.com',
  pass: '1234',
  alias: 'niksmac'
}

describe('db', function () {
  describe('create', function () {
    it('shuld return orbit instance', function () {
      dbObj.should.be.a('object')
    })

    it('shuld return key dbname', function () {
      dbObj.should.have.property('dbname')
    })
  })

  describe('user', function () {
    it('shuld return ipfs hash', function () {
      db.saveUser(user).should.eventually.have.length(46)
    })

    it('should be able to login using test data', function () {
      db.authenticateUser(dbObj, user.email, user.pass).then((res) => {
        expect(res).to.be.true
      })
    })
  })
})
