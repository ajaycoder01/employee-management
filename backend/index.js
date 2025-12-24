

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config();
// require('./Models/db'); // DB connection

const AuthRouter = require('./Routes/AuthRouter');
const EmployeeRouter = require('./Routes/EmployeeRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;
const mongo_url = process.env.MONGO_CONN;

let isConnected = false;
async function connectToMongoDB(){
    mongoose.connect(mongo_url)
    .then(()=>{
        isConnected = true;
        console.log("MongoDB connected! ");
    }).catch((err)=>{
        console.log("MongoDB Connection ERROR : ",err);
    })
}

app.use((req,res,next)=>{
    if(!isConnected){
        connectToMongoDB();
    }

    next();
})  


app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/auth', AuthRouter);
app.use('/api/employees', EmployeeRouter);

app.get('/', (req, res) => res.send('Server is running...'));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// do not use app.listen() in vercel
module.exports = app
