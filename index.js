require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors')
//routes
const productRoutes = require('./Routes/products');
const authRoutes = require('./Routes/authRoutes');
const lipaNaMpesa = require('./Routes/lipaNaMpesa')
const googleRoute = require('./Routes/googleOauth')

//intilalize app
const app = express();

//middleware
app.use(express.json());
app.use(cors())


//connect to database

mongoose.connect(process.env.DB_URI)
.then(()=>{
    app.listen(process.env.PORT) || 5000
    console.log("connected")
}).catch(error=>{
    console.log(error)
})

//routes
app.use(productRoutes);
app.use(authRoutes);
app.use(googleRoute)
app.use(lipaNaMpesa)

