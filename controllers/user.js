const User = require('../models/user')

module.exports.getOneUser = async (req, res) => {
  User.findOne({ where: { userId: req.params.id }})
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err))
}

module.exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.params.id }
    })
    res.status(200).json({ message: 'Utilisateur supprimé !' })
  } catch(err) {
    res.status(500).json({ err })
  }
}

module.exports.modifyUser = async (req, res) => {
  await User.update(
    {
      pseudo: req.body.pseudo,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    },
    {
      where: { id: req.params.id }
    }
  )
  .then(() => res.status(200).json({ message: 'Informations modifiés !' }))
  .catch(err => res.status(400).json({ err }))
}