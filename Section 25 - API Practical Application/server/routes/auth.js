const express = require('express');
const router = require('./feed');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const routers = express.Router();

router.put('/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User
          .findOne({ email: value })
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject('E-mail address already exists!');
            }
          });
      })
      .normalizeEmail(),
    body('password')
      .isLength({ min: 5 }),
    body('name').trim().not().isEmpty()
  ],

  authController.putSignup
);

router.post('/login', body('email').normalizeEmail(), authController.postLogin);

module.exports = router;