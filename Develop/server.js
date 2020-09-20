// Require Express 
const express = require("express");
// Require path
const path = require("path");
// Require mongoose
const mongoose = require('mongoose');

// Create an instance of express
const app = express();
// Create a port
const port = 3000;

// Open a connection to MongoDB workout database
await mongoose.connect('mongodb://localhost/workout', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Serve static files
app.use(express.static('public'));

// HTML Routes
// Create a root route and handler 
app.get('/', (req, res) => {
  // Send message
  res.sendFile(path.join(`${__dirname}/public/index.html`));
});
// Create a root route and handler 
app.get('/exercise', (req, res) => {
  // Send message
  res.sendFile(path.join(__dirname + '/public/exercise.html'));
});
// Create a root route and handler 
app.get('/stats', (req, res) => {
  // Send message
  res.sendFile(path.join(__dirname + '/public/stats.html'));
});

// API Routes
// POST Route for exercise page
// app.post('/api/workouts', (req, res) => {
//   res.json(res);
// });

// Listen on port 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})