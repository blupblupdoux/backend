# Data

## Model

Models are stored in a directory named `models`.

```
// thing.js
const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Thing', thingSchema);
```

Here `Thing` is the name of the model.

In the schema we pass all the property our object should include and we also pass some requirements. See full list at https://mongoosejs.com/docs/schematypes.html.


## Persist to db

```
const thing = new Thing(yourData);
thing.save()
    .then(() => // do something))
    .catch(error => // catch error));
```


Don't forget to import the model we want to use.

`yourData` can be any javascript object, but it should match the fields of your model.

When used in a middleware, you can directly pass the request body. You just need to remove the default _id from the object.

```
delete req.body._id;
const thing = new Thing({...req.body});
```

**Full middleware example:** 

```
app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({...req.body});
  thing.save()
      .then(() => res.status(201).json({message: 'Object created!'}))
      .catch(error => res.status(400).json({ error }));
});
```

## Retrieve from db

### Get all

```
app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});
```

### Get one item

```
app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
})
```