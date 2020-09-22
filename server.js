// Require Express 
const express = require("express");
// Require path
const path = require("path");
// Require mongoose
const mongoose = require('mongoose');
// Require morgan
const morgan = require('morgan');
// Require models folder
const db = require('./models');

// Create a port
const PORT = process.env.PORT || 3000;

// Create an instance of express
const app = express();

// Open a connection to MongoDB workout database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
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
  db.Workout.find({}).then(data => {
    data.forEach(workout => {
      var total = 0;
      workout.exercises.forEach(e => {
          total += e.duration;
      });
      workout.totalDuration = total;

  });
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
})

// POST Route
app.post('/api/workouts', (req, res) => {  
  db.Workout.create({}).then((data => {
    res.json(data);
    console.log('Success!');
  })).catch(err => {
    res.json(err);
  });      
});

// // Update Route for exercise page
// app.put("/api/workouts/:id", (req, res) => {
  
//   db.Workout.findOneAndUpdate(
//     { id: req.params.id },
//       {
//         $push: { exercises: req.body }
//       },
//       { new: true }).then(dbWorkout => {
//         res.json(dbWorkout);
//       }).catch(err => {
//         res.json(err);
//       }); 
      
// });

app.get('/api/workouts/range', (req, res) => {
  db.Workout.find({}).then(summary => {
    res.json(summary);
  }).catch(err => {
    res.json(err);
  });
});

// Listen on port 3000
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});