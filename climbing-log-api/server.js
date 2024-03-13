// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line

const app = express();
const climbsRouter = require('./routes/climbs');
const port = process.env.PORT || 3000;

// Database connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Connection error:', err));

app.use(express.json());
app.use(cors()); // Add this line
app.use('/climbs', climbsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
