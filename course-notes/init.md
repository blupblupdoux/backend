# Initialization

## Directory

Create a directory

Execute `npm init`

Add a `.gitignore` with *node_modules* in it

Create the entry point file `server.js`

## Server

```
const http = require('http')

const server = http.createServer((req, res) => {
  res.end('Server response!')
})

server.listen(process.env.PORT || 3000)
```

This is the basic code to start a node server

You can start the node server by running the command `node server`. 

By default the server need to be restart after each change. To prevent that make sure nodemon is installed and run `nodemon server` instead of `node server`.