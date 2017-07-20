const IpfsApi = require('ipfs-api')
const OrbitDB = require('orbit-db')

const ipfs = IpfsApi('127.0.0.1', '5001')
const orbitdb = new OrbitDB(ipfs)

const bcrypt = require('bcrypt')
const saltRounds = 10
const shortid = require('shortid')

var dbModal = require('./src/db')

const db = orbitdb.docstore('oiobo.db.users', { indexBy: 'alias' })

var user = {
  _id: 1002,
  email: 'nik@light.com',
  pass: '12df34',
  maybe: 'true',
  alias: 'niksmac'
}
// bcrypt.hash(user.pass, saltRounds).then(function (hash) {
//   db.put(user)
// })
db.events.on('ready', () => {
  var val = dbModal.authenticateUser(user.email, user.pass)
  console.log(val)
  var f = db.query((e) => e.email == user.email)
  console.log(f)
})
// db.events.on('ready', () => {
//   console.log('ready?')
//   var doc = db.query((e) => e.email == 'nik@light.com')
//   console.log(doc)
// })
db.load()
