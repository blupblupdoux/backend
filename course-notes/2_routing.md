# Routing

## Middleware

```
app.use((req, res, next) => {
  res.json({ message: 'Request sent!' });
  next();
})
```

This is a middleware, it is executed when requests are sent.

If you have 10 middlewares, you'll pass in each one for each request.

The `next` method allow to pass to the next middleware, not needed for the last middleware.

## CORS Policies

To prevent CORS policies errors when fetching routes we can add the following middleware to app.js.

```
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})
```

## Routes (no router)

### Types

`app.use('/api/stuff', (req, res, next) => {})`

This is the general method, this will intercept all request at the /api/stuff endopint, no matter the type (get, post, etc). To target a specific route method you can replace use by the method wanted

Ex: `app.get('/api/stuff')` or `app.put('/api/stuff')`

### Access JSON content

To access the JSON content when doing post or put route type for example we need to add the following line of code in app.js. It should be the very first middleware.

```
app.use(express.json())
```

Then you can access the JSON content thanks to `req.body` in your middleware.

## Routes (with router)

If we put everything in `app.js` it'll be soon a mess. To prevent that we need to organize our routes thanks to express router.

### Structure

Routes files are stores in a `routes` directory.

```
// routes/stuff.js
const express = require('express');
const router = express.Router();

// put here all routes

module.exports = router;
```


```
// app.js
const stuffRoutes = require('./routes/stuff');
app.use('/api/stuff', stuffRoutes);
```

In this case all routes inside the stuff.js file will be preceded by `/api/stuff`.

### Routes syntaxe

The syntaxe is almost the same than without the router. The only changes are : 

- `app.xx` is replaced by `router.xx`

- The path is adapted according to the parent path declared inside the `app.js` file

```
// BEFORE
app.get('/api/stuff/:id', (req, res, next) => {
  // your code
});
```
```
// AFTER
router.get('/:id', (req, res, next) => {
  // your code
});
```