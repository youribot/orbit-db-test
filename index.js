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
  alias: 'niksmac'
}
// bcrypt.hash(user.pass, saltRounds).then(function (hash) {
//   user.pass = hash
//   db.put(user)
// })
db.events.on('ready', () => {
  var val = dbModal.authenticateUser(db, user.email, user.pass)
  if (val !== false) {
    val.then((res) => {
      console.log(res)
    })
  }
})

db.load()
