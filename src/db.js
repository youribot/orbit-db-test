'use strict'

const IpfsApi = require('ipfs-api')
const OrbitDB = require('orbit-db')

const ipfs = IpfsApi('127.0.0.1', '5001')
const orbitdb = new OrbitDB(ipfs)

const bcrypt = require('bcrypt')
const saltRounds = 10
const shortid = require('shortid')

var _this = this

exports.createDb = function (dbname, indexBy) {
  var docstore = orbitdb.docstore(dbname, { indexBy: indexBy })
  return docstore
}

exports.saveUser = function (usr) {
  const db = _this.createDb('oiobo.db.users', 'alias')
  var id = shortid.generate()
  var hash = bcrypt.hashSync(usr.pass, saltRounds)
  return db.put({ _id: id, email: usr.email, pass: hash, alias: usr.alias})
}

exports.authenticateUser = function (email, password) {
  const db = _this.createDb('oiobo.db.users', 'email')
  // db.events.on('ready', () => {
  return db.query((e) => e.email == email)

  // })
  // db.load()
}
