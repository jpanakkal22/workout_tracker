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
  process.env.MONGODB_URI || 'mongodb://localhost/workout', { useNewUrlParser: true }
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false
  // }
);


// Require api routes
require("./routes/api-routes.js")(app);

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

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});