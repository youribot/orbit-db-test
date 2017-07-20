'use strict'

const IpfsApi = require('ipfs-api')
const OrbitDB = require('orbit-db')

const ipfs = IpfsApi('127.0.0.1', '5001')
const orbitdb = new OrbitDB(ipfs)

const bcrypt = require('bcrypt')
const saltRounds = 10
const shortid = require('shortid')

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
