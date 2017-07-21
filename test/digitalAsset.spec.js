var assert = require('assert')
var chai = require('chai')

var da = require('../src/digitalAsset')

var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()
var expect = chai.expect
const assertArrays = require('chai-arrays')
chai.use(assertArrays)

var dbname = 'oiobo.test.digitalAsset'
var dbObj = da.createDb(dbname, 'id')

var da1 = {
  'type': 'video',
  'title': 'The Ferrari 458',
  'image': 'http://boy-toys.ru/images/goods/d1fe173d08e959397adf34b1d77e88d71.png',
  'snippet': 'The Ferrari 458 Italia is a mid-engined sports car produced by the Italian sports car manufacturer Ferrari.',
  alias: 'niksmac'
}
var da2 = {
  'type': 'message',
  'messages': [
    {
      'from': 'nik',
      'txt': 'hello there nik'
    },
    {
      'from': 'sibi',
      'txt': 'hey sibi there...'
    }
  ],
  alias: 'niksmac'
}

var da3 = {
  'type': 'contact',
  'name': 'Shaji A John',
  'number': '9846471991',
  'email': 'nik@nik.nik',
  alias: 'notme'
}

describe('db', function () {
  describe('create', function () {
    it('shuld return orbit instance', function () {
      dbObj.should.be.a('object')
    })
  })
})
describe('digitalAsset', function () {
  describe('offer', function () {
    it('shuld return ipfs hash da1', function () {
      da.saveOffer(da1).should.eventually.have.length(46)
    })

    it('shuld return ipfs hash da2', function () {
      da.saveOffer(da2).should.eventually.have.length(46)
    })

    it('shuld return ipfs hash da3', function () {
      da.saveOffer(da3).should.eventually.have.length(46)
    })
  })

  describe('offer-list', function () {
    it('shuld return an array of items', function () {
      expect(da.listMyOffers('niksmac')).to.be.array()
    })

    it('shuld return an array of size 2', function () {
      expect(da.listMyOffers('niksmac')).to.be.ofSize(2)
    })
  })
})
