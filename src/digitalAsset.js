'use strict'

const IpfsApi = require('ipfs-api')
const OrbitDB = require('orbit-db')

const ipfs = IpfsApi('127.0.0.1', '5001')
const orbitdb = new OrbitDB(ipfs)

const bcrypt = require('bcrypt')
const saltRounds = 10
const shortid = require('shortid')

const db = orbitdb.docstore('oiobo.db.digitalAsset')

var _this = this

exports.createDb = function (dbname, indexBy) {
  return orbitdb.docstore(dbname, { indexBy: indexBy })
}

exports.saveOffer = function (offer) {
  offer.id = shortid.generate()
  return db.put(offer)
}

exports.listMyOffers = function (alias) {
  return db.query((e) => e.alias == alias)
}
