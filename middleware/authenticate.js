const express = require('express');
const auth = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_RENDER_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// Initialize the authentication middleware
app.use(auth(config));

// Custom middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.oidc.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ error: 'User not authenticated' });
  }
};

// Routes
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/test', isAuthenticated, (req, res) => {
  res.send(JSON.stringify('Hello World'));
});

// Your other routes and middleware can be defined here...

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
