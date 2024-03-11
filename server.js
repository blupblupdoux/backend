const http = require('http')

const server = http.createServer((req, res) => {
  // INFO - this callaback is executed each time the server is called
  res.end('Server response TEST!')
})

server.listen(process.env.PORT || 3000)