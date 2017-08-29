const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

const Contact = require('../../models/contacts');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// GET method to retieve contacs
router.get('/contacts', (req, res, next) => {
  Contact.find(function(err, contacts) {
    res.json(contacts);
  })
  //res.send('Retrieving Contact List');
});

// POST to add contacts
router.post('/contact', (req, res, next) => {
  //res.send('Adding Contact to List');
  let newContact = new Contact({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone
  });

  newContact.save((err, contact) => {
    if (err) {
      res.json({msg: 'Failed to add contact.'});
    }
    else {
      res.json({msg: 'Contact added successfully'});
    }
  });
});

// delete contacts
router.delete('/contact/:id', (req, res, next) => {
  //res.send('Deleting Contact to List');
  Contact.remove({_id: req.params.id}, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

module.exports = router;
