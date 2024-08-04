const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { submitRequest } = require('./controllers/requestController');

const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Serve static files from 'dist' directory
app.use(express.static(path.join(__dirname, "../dist")));

// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Serve index.html for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Handle form submission
app.post("/api/submit", submitRequest);

// Function to start the server
function startServer(port) {
  const listener = app.listen(port, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
  });
  return listener;
}

// If the file is executed directly, start the server with the specified or default port
if (require.main === module) {
  const port = process.env.PORT || 3000;
  startServer(port);
}

module.exports = { app, startServer };
