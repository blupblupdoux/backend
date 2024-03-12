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

The callback in the `createServer` method is executed each time the server is called. In this case we display the given message in the browser page.

You can start the node server by running the command `node server`. 

By default the server need to be restart after each change. To prevent that make sure nodemon is installed and run `nodemon server` instead of `node server`.

## Express

Install express in the backend project with `npm install express --save`

### Application Express

``` 
// app.js
const express = require('express')
const app = express()
app.use((req, res) => {
  res.json({ message: 'Request sent!' })
})
module.exports = app
```

The main application will be located at ./app.js

We can see the the function inside app.use is the same as the `createServer` method callback.

### Use Express App in Server

``` 
// server.js
const http = require('http')
const app = require ('./app')
const port = process.env.PORT || 3000

app.set('port', port)
const server = http.createServer(app)

server.listen(port)
```

To render our app when the server is called we need to import the app in the server and pass it to the callback of the `createServer` method. 

### Optimized server.js

```
const http = require('http');
const app = require ('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

const server = http.createServer(app)
const port = normalizePort(process.env.PORT || 3000);
const address = server.address();
const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') throw error;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
}

server.on('error', errorHandler);
server.on('listening', () => { console.log('Listening on ' + bind); });

server.listen(port)

```