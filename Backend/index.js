const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());   

// Available Routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/details', require('./routes/details.js'))


app.listen(port, ()=>{
    console.log(`Example app listening at ${port}`);
})

