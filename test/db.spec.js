var assert = require('assert')
var chai = require('chai')
var db = require('../src/db')

var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()
var expect = chai.expect
var dbname = 'oiobo.db.test.users'
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
      var val = db.authenticateUser(dbObj, user.email, user.pass)
      if (val !== false) {
        val.then((res) => {
          expect(res).to.be.true
        })
      }
    })

    it('should return false using wrong password', function () {
      var val = db.authenticateUser(dbObj, user.email, 'wrong password')
      if (val !== false) {
        val.then((res) => {
          expect(res).to.be.false
        })
      }
    })

    it('should return false email not exist', function () {
      var val = db.authenticateUser(dbObj, 'sdfdsfdsfsdjhsijsdfhidsjh@kjsdjfhdsjj.vom', user.pass)
      expect(val).to.be.false
    })
  })
})
