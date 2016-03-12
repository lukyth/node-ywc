'use strict'
let app = require('express')()
let http = require('http').Server(app)
let io = require('socket.io')(http)
let path = require('path')
let express = require('express')
const PORT = 3001

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log(`Total ${io.engine.clientsCount} client has connected`)
  socket.on('chat message', function(msg){
    io.emit('chat message', msg)
  })
  socket.on('disconnect', () => {
    console.log('User has disconnected');
  })
})


http.listen(PORT, () =>{
  console.log(`listening on *:${PORT}`)
})
