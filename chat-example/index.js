'use strict'
let express = require('express')
let app = express()
let http = require('http').Server(app)
let io = require('socket.io')(http)
let path = require('path')
const PORT = 3001

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('Found some new connection')

  socket.on('send', (message) => {
    console.log(message)
    io.emit('update', message)
  })
})

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
