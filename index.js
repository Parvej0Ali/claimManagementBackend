const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const policyRoutes = require('./routes/policyRoutes');
const claimRoutes = require('./routes/claimRoutes');
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB

mongoose.connect(process.env.db_url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use routes
app.get('/', (req, res) => {
  res.send("hello");
})
app.use('/api', userRoutes);
app.use('/api', policyRoutes);
app.use('/api', claimRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
