const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


module.exports.register = async (req, res) => {
  let pseudo = req.body.pseudo
  let firstname = req.body.firstname
  let lastname = req.body.lastname
  let email = req.body.email
  let password = req.body.password

  if (pseudo == null || firstname == null || lastname == null || email == null || password == null) {
    return res.status(400).json({ error: 'missing parameters' })
  }

  User.findOne({
    attributes: ['email'],
    where: { email: email }
  })
    .then(function(userFound) {
      if(!userFound) {
        bcrypt.hash(password, 10, function(err, hash) {
          let userId = Math.floor(Math.random() * 1000000).toString().padStart(7, '0');
          let newUser = User.create({
            pseudo: pseudo,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash,
            userId: userId
          })
          .then(function(newUser) {
            return res.status(201).json({
              'userId': newUser.userId
            })
          })
          .catch(function(err) {
            return res.status(500).json({
              error: 'cannot add user'
            })
          })
        })
      } else {
        return res.status(409).json({
          error: 'user already exist'
        })
      }
    })
    .catch(function(err) {
      return res.status(500).json({
        error: 'unable to verify user'
      })
    })
}

module.exports.login = async (req, res) => {
  let email = req.body.email
  let password = req.body.password

  if(email == null || password == null) {
    return res.status(400).json({ error: 'Missing parameters' })
  }

  User.findOne({
    where: { email: email }
  })
    .then(function(userFound){
      if(userFound) {
        bcrypt.compare(password, userFound.password, function(errHash, resHash){
          if(resHash) {
            return res.status(200).json({
              'userId': userFound.userId,
              'token': jwt.sign(
                { userId: userFound.userId },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '1h' }
              ),
              'email': userFound.email,
              'pseudo': userFound.pseudo,
              'isAdmin': userFound.isAdmin
            })
          } else {
            return res.status(403).json({ error: 'Invalid password' })
          }
        })
      } else {
        return res.status(404).json({ error: 'user not exist in DB' })
      }
    })
    .catch(function(err){
      return res.status(500).json({ error: 'unable to verify user' })
    })
}

module.exports.changePassword = async (req, res) => {
  const userId = req.body.userId;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  if (userId == null || oldPassword == null || newPassword == null) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  User.findOne({
    where: { id: userId },
  })
    .then(function (userFound) {
      if (userFound) {
        bcrypt.compare(oldPassword, userFound.password, function (errHash, resHash) {
          if (resHash) {
            bcrypt.hash(newPassword, 10, function (err, hash) {
              if (err) {
                return res.status(500).json({ error: 'Error hashing password' });
              }

              userFound.update({ password: hash }).then(function (updatedUser) {
                return res.status(200).json({ message: 'Password updated successfully' });
              }).catch(function (err) {
                return res.status(500).json({ error: 'Error updating password' });
              });
            });
          } else {
            return res.status(403).json({ error: 'Incorrect old password' });
          }
        });
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(function (err) {
      return res.status(500).json({ error: 'Unable to verify user' });
    });
};