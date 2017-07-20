'use strict'

const IpfsApi = require('ipfs-api')
const OrbitDB = require('orbit-db')

const ipfs = IpfsApi('192.168.27.101', '5001')
const orbitdb = new OrbitDB(ipfs)

const bcrypt = require('bcrypt')
const saltRounds = 10
const shortid = require('shortid')

const db = orbitdb.docstore('oiobo.db.users', { indexBy: 'alias' })
//
// const db = orbitdb.docstore('orbit.users.profile', { indexBy: 'alias' })
//
// var user = {
//   email: 'nik@nffdifk.com',
//   pass: '1234',
//   alias: 'niksmac'
// }
//
// db.events.on('ready', () => {
//   var c = db.query((e) => e.alias == 'niksmfdfdfac')
//   console.log(c)
// })
// db.load()
//
// function saveUser (usr) {
//   var user = {
//     email: 'nik@nffdifk.com',
//     pass: '1234',
//     alias: 'niksmac'
//   }
//   bcrypt.hash(user.pass, saltRounds).then(function (hash) {
//     db.put({ _id: 10001, email: user.email, pass: hash, alias: user.alias })
//   })
// }

var _this = this

exports.createDb = function (dbname, indexBy) {
  return orbitdb.docstore(dbname, { indexBy: indexBy })
}

exports.saveUser = function (usr) {
  var id = shortid.generate()
  var hash = bcrypt.hashSync(usr.pass, saltRounds)
  return db.put({ _id: id, email: usr.email, pass: hash, alias: usr.alias})
}

function getUserByEmail (email) {
  return db.query((e) => e.email == email)
}

exports.authenticateUser = function (email, password) {
  var users = getUserByEmail(email)
  console.log(users)
  if (users.length > 0) {
    var user = users.shift()
    return bcrypt.compare(password, user.pass)
  }
  return false
}
