const IpfsApi = require('ipfs-api')
const OrbitDB = require('orbit-db')

const ipfs = IpfsApi('192.168.27.101', '5001')
const orbitdb = new OrbitDB(ipfs)

const bcrypt = require('bcrypt')
const saltRounds = 10
const shortid = require('shortid')

var dbModal = require('./src/db')

const db = orbitdb.docstore('oiobo.db.users', { indexBy: 'alias' })

var user = {
  email: 'nik@light.com',
  pass: '1234',
  alias: 'niksmac'
}
// bcrypt.hash(user.pass, saltRounds).then(function (hash) {
//   user.pass = hash
//   db.put(user)
// })
db.events.on('ready', () => {
  var val = dbModal.authenticateUser(db, user.email, user.pass).then(function (res) {
    console.log(res)
  })
})
// db.events.on('ready', () => {
//   console.log('ready?')
//   var doc = db.query((e) => e.email == 'nik@light.com')
//   console.log(doc)
// })
db.load()
