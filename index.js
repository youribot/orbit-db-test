const IpfsApi = require('ipfs-api')
const OrbitDB = require('orbit-db')

const ipfs = IpfsApi('192.168.27.101', '5001')
const orbitdb = new OrbitDB(ipfs)

const bcrypt = require('bcrypt')
const saltRounds = 10
const shortid = require('shortid')

const db = orbitdb.docstore('orbit.users.profile', { indexBy: 'alias' })

var user = {
  email: 'nik@nffdifk.com',
  pass: '1234',
  alias: 'niksmac'
}
bcrypt.hash(user.pass, saltRounds).then(function (hash) {
  db.put({ _id: 10001, email: user.email, pass: hash, alias: user.alias })
})

db.events.on('ready', () => {
  var c = db.query((e) => e.email == 'nik@nffdifk.com')
  console.log(c)
})
db.load()
