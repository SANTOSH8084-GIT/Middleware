const express = require("express");
const bodyParser = require('body-parser');
const app = express();

// Replace this with your actual token
const secretToken = 'F99717B46FFD3157A244151387FCFZ';

// Middleware to check for the token in headers for a specific route
const checkTokenMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token || token !== secretToken) {
    return res.status(401).json({ message: 'Unauthorized - Token missing or invalid' });
  }
  next();
};

// Apply middleware for token check only to the specific route
app.use('/api/secure-route', checkTokenMiddleware);
app.use('/api/secure-route2', checkTokenMiddleware);

// Example route that requires a valid token
app.get('/api/secure-route', (req, res) => {
  res.json({ message: 'Access granted - Token is valid!' });
});

app.get('/api/secure-route2', (req, res) => {
  res.json({ message: 'Access granted - Token is valid!' });
});

// Example route without token requirement
app.get('/api/public-route', (req, res) => {
  res.json({ message: 'This route is public and does not require a token.' });
});

app.listen(5000);
