import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../services/user.model.js';
const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    console.log('trying to log');
    console.log(req.body);
    //const user = await getUserByEmail(req.body.email);
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      });
    }

    const authSecret = process.env.AUTH_SECRET || 'secret';

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, authSecret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      // id: user._id,
      email: user.email,
      name: user.name,
      auth_token: token,
      expiresIn: 86400
    });
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }
});

// Route to create a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password: bcrypt.hashSync(password, 8), games: [] });
    await newUser.save();

    res.status(201).json({ userId: newUser._id });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.get('/users', (req, res) => {
//   var sql = 'select * from game';
//   var params = [];
//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

export default router;
