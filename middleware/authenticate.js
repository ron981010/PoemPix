const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Your MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI;

// Your GitHub authentication credentials
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;

// Middleware to parse JSON data
app.use(express.json());

// Your MongoDB and other routes and middleware can be defined here...

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
