const eventModel = require('../models/evenement')

module.exports.readEvent = async (req, res) => {
  eventModel.findAll()
    .then(events => res.status(200).json(events))
    .catch(error => res.status(400).json({ error }))
}

module.exports.leaveEvent = async (req, res) => {
  const result = await eventModel.findOne({where: {id: req.params.id}})
  let storageUserEvent = JSON.parse(result.eventParticipant)
  const userId = req.body.userId
  const defineId = storageUserEvent.indexOf(userId)

  console.log('userId', userId);
  console.log('storage before change', storageUserEvent);

  if (defineId >= 0) {
    storageUserEvent.splice(defineId, 1)
    console.log('FOUND');
  } else return console.log('NOT FOUND');

  console.log('storage after change', storageUserEvent);
  

  eventModel.findOne({ where: {id: req.params.id }})
    .then(() => {
      eventModel.update(
        {
          eventParticipant: JSON.stringify(storageUserEvent)
        },
        {
          where: { id: req.params.id }
        }
      )
      .then(() => {
        res.status(200).json({ usersEventUpdated : storageUserEvent })
        console.log('result',storageUserEvent);
      }).catch((err) => {
        res.status(404).json({ err })
      })
    })
    .catch((err) => {
      res.status(400).json({ err })
    })
}

// module.exports.chatEvent = async (req, res) => {
//   let storageChatEvent = []
//   const result = await eventModel.findOne({where: {id: req.params.id}})
//   const chatMessage = req.body.chatMessage
//   const user = req.body.pseudo

//   console.log('chatMessage',user +' : '+ chatMessage);

//   if (result.eventChat) {
//     storageChatEvent = JSON.parse(result.eventChat)
//     storageChatEvent.push(user +' : '+ chatMessage)
//   } else {
//     storageChatEvent.push(user +' : '+ chatMessage)
//   }

//   eventModel.findOne({ where: {id: req.params.id }})
//   .then(() => {
//     eventModel.update(
//       {
//         eventChat: JSON.stringify(storageChatEvent)
//       },
//       {
//         where: { id: req.params.id }
//       }
//     )
//     .then(() => {
//       res.status(200).json({ chatEventUpdated : storageChatEvent })
//       console.log('result',storageChatEvent);
//     }).catch((err) => {
//       res.status(404).json({ err })
//     })
//   })
//   .catch((err) => {
//     res.status(400).json({ err })
//   })
// }

module.exports.joinEvent = async (req, res) => {
  let storageUserEvent = []
  const result = await eventModel.findOne({where: {id: req.params.id}})
  const userId = req.body.userId

  if (result.eventParticipant) {
    storageUserEvent = JSON.parse(result.eventParticipant)
    storageUserEvent.push(userId)
  } else {
    storageUserEvent.push(userId)
  }

  // evite les doubles inscriptions
  // a faire

  eventModel.findOne({ where: {id: req.params.id }})
    .then(() => {
      eventModel.update(
        {
          eventParticipant: JSON.stringify(storageUserEvent)
        },
        {
          where: { id: req.params.id }
        }
      )
      .then(() => {
        res.status(200).json({ usersEventUpdated : storageUserEvent })
        console.log('result',storageUserEvent);
      }).catch((err) => {
        res.status(404).json({ err })
      })
    })
    .catch((err) => {
      res.status(400).json({ err })
    })
}

module.exports.addEvent = async (req, res) => {
  const event = new eventModel({
    ...req.body
  })
  event.save()
    .then(() => res.status(201).json({ message: 'Evenement ajouté !' }))
    .catch(error => res.status(400).json({ error }))
}

module.exports.deleteEvent = async (req, res) => {
  eventModel.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'Evenement supprimé' }))
    .catch(error => res.status(400).json({ error }))
}

module.exports.modifyEvent = async (req, res) => {
    await eventModel.update(
      {
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        eventLongDescription: req.body.eventLongDescription,
        eventMaxParticipant: req.body.eventMaxParticipant
        // picture
        // participant
      },
      {
        where: { id: req.params.id }
      }
    )
    .then(() => res.status(200).json({ message: 'Event modifié !' }))
    .catch(err => res.status(400).json({ err }))
}
