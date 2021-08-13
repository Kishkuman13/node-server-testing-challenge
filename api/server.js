const express = require('express');

const User = require('./users/users-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/users', (req, res) => {
  User.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/users/:id', (req, res) => {
  User.getById(req.params.id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post('/users', (req, res) => {
  User.insert(req.body)
    .then(user => res.json(user))
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete('/users/:id', (req, res) => {
  User.remove(req.params.id)
    .then(result => {
      if (result) {
        res.sendStatus(204)
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put('/users/:id', (req, res) => {
  User.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = server;
