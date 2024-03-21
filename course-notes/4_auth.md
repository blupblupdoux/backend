# Authentication

## Model User

We need to create a `User` model.

Here we need a unique field, so we need to install the package `npm install --save mongoose-unique-validator`.

If you don't need a unique field, just remove the `uniqueValidator` lines.

```
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.plugins(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
```

## Create user

We need bcrypt package to encrypt the password `npm install --save bcrypt`

```
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'User created!' }))
        .catch(error => res.status(500).json({ error }));;
    })
    .catch(error => res.status(500).json({ error }));
};
```

## Login

### Method

It's a basic login method, you get the user in DB and then you check is the password is matching. Here is a full example.

```
try {
  const user = await User.findOne({ email: req.body.email })

  if(!user) return res.status(401).json({message: 'Wrong credientials.'})

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

  if(!isPasswordValid) return res.status(401).json({message: 'Wrong credientials.'})

  res.status(200).json({userId: user._id, token: 'TOKEN'});

} catch(error) {
  res.status(500).json({error})
};
```

### Auth token

We need to install the token package (here JWT) with `npm install --save jsonwebtoken`

```
const jwt = require('jsonwebtoken')
const token = jwt.sign(
  { userId: user._id },
  'RANDOM_TOKEN_KEY',
  { expiresIn: '24h' }
);
res.status(200).json({userId: user._id, token: token});
```

The 3 arguments of the sign method are:

- **The payload**. Here we choose to put the user id but we can put whatever we want.
- **The encrypt string**. You can put whatever you want, it's use to encrypt the token. In production we want to put a randowmize string for more security.
- **The options**. Here we want to specify that the token should expire after 24h.

## Auth middleware

```
try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_KEY');
    req.auth = { userId: decodedToken.userId };
  } catch(error) {
    res.status(401).json({ error });
  }
```

Here we get and decode the token and store ou payload values in the req so the route can access the values.