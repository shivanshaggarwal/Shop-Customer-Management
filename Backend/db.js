const mongoose = require('mongoose');


const mongoURI = "mongodb+srv://shivansh:shivanshaggarwal@cluster0.5ufigd1.mongodb.net/?retryWrites=true&w=majority";
const DATABASE = process.env.MONGO_URI;

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
        console.log(`${DATABASE}` , "This is env vairable");
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