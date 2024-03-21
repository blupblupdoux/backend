const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');

exports.signup = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({ email: req.body.email, password: hash });
  
    await user.save();

    res.status(201).json({ message: 'User created!' });
  } catch(error) {
    res.status(500).json({error})
  };
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(401).json({message: 'Wrong credientials.'})

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordValid) return res.status(401).json({message: 'Wrong credientials.'})

    const token = jwt.sign(
      { userId: user._id },
      'RANDOM_TOKEN_KEY',
      { expiresIn: '24h' }
    );

    res.status(200).json({userId: user._id, token: token});
  } catch(error) {
    res.status(500).json({error})
  };

};