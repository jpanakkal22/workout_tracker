// Require Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// Create PORT
const PORT = process.env.PORT || 3000;

// Create instance of express
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use static file
app.use(express.static("public"));

// Mongoose connection to database
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/thawing-caverns',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);


// // Require api routes
// require("./routes/api-routes.js")(app);

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

// GET Route for all workouts
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

// POST Route / posts an empty object with an id to be used for the update route
app.post('/api/workouts', (req, res) => {  
  db.Workout.create({}).then((data => {
  res.json(data);
  console.log('Success!');
  })).catch(err => {
  res.json(err);
  });      
});

// Update Route for exercise page using id from post route
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

// Get route for Fitness Tracker Dashboard
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