// Require Express 
const express = require("express");
// Create an instance of express
const app = express();
// Create a port
const port = 3000
// Create a root route and handler 
app.get('/', (req, res) => {
  // Send message
  res.send('Hello World!')
})
// Listen on port 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})