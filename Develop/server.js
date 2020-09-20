// Require Express 
const express = require("express");
// Require path
const path = require("path");

// Create an instance of express
const app = express();
// Create a port
const port = 3000

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

// Listen on port 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})