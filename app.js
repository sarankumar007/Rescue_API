const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your allowed origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://rescue:rescue123@cluster0.0xsgsho.mongodb.net/Pearl', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

const AgencyRegistration = mongoose.model('AgencyRegistration', {
    // Define the schema for the documents in the collection
    // You should replace these fields with your actual schema
    agency:String,
    type:String,
    license:String,
    headname:String,
    email:String,
    contacts:Number,
    longitude:String,
    latitude:String,
    SMplatform:String,
    SMusername:String
    // ... other fields ...
  });

// Middleware for parsing JSON and URL-encoded body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// GET all documents
app.get('/api/agencyregistrations', async (req, res) => {
    try {
      const agencyRegistrations = await AgencyRegistration.find();
      res.json(agencyRegistrations);
    } catch (err) {
      console.error('Error fetching agency registrations:', err);
      res.status(500).json({ error: 'Error fetching agency registrations' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
