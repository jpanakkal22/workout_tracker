const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

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

// Update Route for exercise page
app.put("/api/workouts/:id", (req, res) => {
  
  db.Workout.findOneAndUpdate({_id: req.params.id}, 
    {
      $push: {exercises : req.body}
    },
    { new: true })    
      .then(dbWorkout => {
        return res.json(dbWorkout);
      }).catch(err => {
        res.json(err);
      });       
});

app.get('/api/workouts/range', (req, res) => {
  db.Workout.find({}).then(summary => {
    res.json(summary);
  }).catch(err => {
    res.json(err);
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});