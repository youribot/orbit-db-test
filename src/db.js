'use strict'

const IpfsApi = require('ipfs-api')
const OrbitDB = require('orbit-db')

const ipfs = IpfsApi('127.0.0.1', '5001')
const orbitdb = new OrbitDB(ipfs)

const bcrypt = require('bcrypt')
const saltRounds = 10
const shortid = require('shortid')
const db = orbitdb.docstore('orbit.users.profile', { indexBy: 'alias' })

var _this = this

exports.createDb = function (dbname, indexBy) {
  return orbitdb.docstore(dbname, { indexBy: indexBy })
}

exports.saveUser = function (usr) {
  var id = shortid.generate()
  var hash = bcrypt.hashSync(usr.pass, saltRounds)
  return db.put({ _id: id, email: usr.email, pass: hash, alias: usr.alias})
}

function getUserByEmail (db, email) {
  return db.query((e) => e.email == email)
}

exports.authenticateUser = function (db, email, password) {
  var users = getUserByEmail(db, email)
  if (users.length > 0) {
    var user = users.shift()
    return bcrypt.compare(password, user.pass)
  }
  return false
}
