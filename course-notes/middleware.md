# Middleware

## Basic

```
app.use((req, res, next) => {
  res.json({ message: 'Request sent!' })
  next()
})
```

This is a middleware, it is executed when requests are sent.

If you have 10 middlewares, you'll pass in each one for each request.

The `next` method allow to pass to the next middleware, not needed for the last middleware.