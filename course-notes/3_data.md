# Data

## Database (monga atlas)

You need to install mongoose: `npm install mongoose` and create a Atlas database.

```
// app.js
const mongoose = require('mongoose');
mongoose.connect('yourPassPhrase')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
```

Where `yourPassPhrase` is you atlas passphrase

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

## Controllers

Controllers are stored in a directory named `controllers`

Controllers are used to store the main logic. We can keep it directly in the route file but it will be quickly messy.

```
// controllers/stuff.js

exports.createThing = (req, res, next) => {
  // your code
});

exports.getAllThing = (req, res, next) => {
  // your code
});
```

```
// routes/stuff.js

const stuffController = require('../controllers/stuff')
router.post('/', stuffController.createThing);
router.get('/', stuffController.getAllThing);
```

**Note: it's important to not put the parenthesis to `createThing` because we're not calling the function.**

## Create new item

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

## Get all items

```
app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});
```

Note: `.json(things)` is the shortcut of `.json(products: things)`. Both will render: `{"products": []}`

## Get one item

```
app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
})
```

## Update one item

```
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});
```

Warning ! If you use the spread operator like that `{ ...req.body}` make sure the `_id` is the one from the db and not the javascript default one. 

Here in this code we make sure to force the `_id` property to prevent that.

## Delete one item

```
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({_id: req.params.id})
      .then(() => res.status(200).json({message: 'Object deleted!'}))
      .catch(error => res.status(400).json({ error }));
})
```