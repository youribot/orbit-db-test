const bcrypt = require('bcrypt')
const saltRounds = 10
const shortid = require('shortid')

var dbModal = require('./src/db')

var dbname = 'oiobo.db.users'
var indexBy = 'alias'
var db = dbModal.createDb(dbname, indexBy)

var user = {
  email: 'nik@light.com',
  pass: '1234',
  alias: 'niksmacp' + new Date()
}

// setInterval(function () {
  // console.log('?')
bcrypt.hash(user.pass, saltRounds).then(function (hash) {
  user.pass = hash
  db.put(user)
})
// }, 3000)

db.events.on('ready', () => {
  console.log(db.get(''))
})

db.events.on('synced', () => {
  console.log(db.get(''))
})

db.load()
