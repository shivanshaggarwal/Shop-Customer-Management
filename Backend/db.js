const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const DATABASE = process.env.MONGO_URI;

const connectToMongo = () =>{
    mongoose.connect(DATABASE, ()=>{
        console.log("Connected to Mongo Successfully");
    });
}

module.exports = connectToMongo;

// const mongoose = require('mongoose');
// // const mongoURI = "mongodb://localhost:27017/project";
// const mongoURI = "mongodb+srv://shivansh:shivanshaggarwal@cluster0.nrdedhm.mongodb.net/?retryWrites=true&w=majority";

// const connectToMongo = () =>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connected to Mongo Successfully");
//     });
// }

// module.exports = connectToMongo;