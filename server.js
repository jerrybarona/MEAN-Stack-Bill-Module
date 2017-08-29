// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/database');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// connect to MongoDB
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/contactlist');
mongoose.connect(config.uri + config.db);

//on successful connection say something
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.db + ' @ 27017');
});

mongoose.connection.on('error', (err) => {
  if (err)
  {
    console.log('Error in Database connection: ' + err);
  }
});

// adding middleware for logging
app.use(morgan('dev'));

// adding middleware for cross-origin connections
app.use(cors());

// Parsers for POST data, so Mongo can process the request as mongo only accpets Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist'))); // granting the user access to the 'dist' folder

// Set our api routes
// this will send all routes with the /api prefix to that particular file
//to handle the requests
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
// const port = process.env.PORT || '4200';

app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
