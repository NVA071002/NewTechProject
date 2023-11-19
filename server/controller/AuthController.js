const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const login = async (req, res, next) => {
  try {
    // Check if user exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(200).send('Invalid username or password.');

    // Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(200).send('Invalid username or password.');
    // Create and assign a token
    // const token = jwt.sign({ _id: user._id }, secret);
    // res.send({ token: token });
    res.status(200).send({
      message: 'Login successful',
      user: {
        _id: user._id,
        email: user.email
        // include other user fields you want to return but NEVER the password
      }
    });
    return;

  } catch (error) {
    res.status(500).send('Error logging in the user');
  }
}

const register = async (req, res, next) => {
  try {
    // Check if user exists
    const users = await User.findOne({ username: req.body.username });
    if (users) return res.status(200).send('Username is already registered');

    // Check if password is correct
    // const validPassword = await bcrypt.compare(req.body.password, user.password);
    // if (!validPassword) return res.status(400).send('Invalid email or password.');
    User.create(req.body)
      .then(() => res.status(200).send({
        message: 'Register successful',
        user: {
          username: req.body.username,
          password: req.body.password
          // include other user fields you want to return but NEVER the password
        }
      }))
    return;

  } catch (error) {
    res.status(500).send('Error logging in the user');
  }
}
module.exports = { login, register}