// Require Express 
const express = require("express");
// Require path
const path = require("path");
// Require mongoose
const mongoose = require('mongoose');
// Require models folder
const db = require('./models');

// Create an instance of express
const app = express();
// Create a port
const port = 3000;

// Open a connection to MongoDB workout database
mongoose.connect('mongodb://localhost/workout', {
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
// GET Route
app.get('/api/workouts', (req, res) => {
  db.Workout.find({})
  .then(data => {
    res.json(data);
  })
})
// POST Route for exercise page
app.put('/api/workouts/:id', (req, res) => {
  db.Workout.findOneAndUpdate(
    {id: req.params.id}, {exercises: req.body}, {new: true})
    .then(workoutData => {
    res.json(workoutData);
  })     
});

app.post('/api/workouts', (req, res) => {
  db.Workout.create(req.body)
  .then(data => {
    res.json(data);
    console.log('Success!');
  })      
});

app.get('/api/workouts/range', (req, res) => {
  db.Workout.find({}).then(summary => {
    res.json(summary);
  })
})

// Listen on port 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})