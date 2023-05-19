require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors')
const axios = require('axios')
//routes
const productRoutes = require('./Routes/products');
const authRoutes = require('./Routes/authRoutes');
const lipaNaMpesa = require('./Routes/lipaNaMpesa')
const googleRoute = require('./Routes/googleOauth')
const {getTimestamp} = require ("./Utils/timeStamp")


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

// routes
//routes
app.use(productRoutes);
app.use(authRoutes);
app.use(googleRoute)
app.use(lipaNaMpesa)


let token;
//mpses access toke
const accessToken = async (req, res, next)=> {
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const auth = new Buffer.from(`${process.env.SAFARICOM_CONSUMER_KEY}:${process.env.SAFARICOM_CONSUMER_SECRET}`).toString('base64')       

    await axios.get(url , {
        headers:
        {
            authorization : `Basic ${auth}`
        }
    }).then((res)=>{
        token= res.data.access_token
        next()
    }).catch((error)=>{
        console.log(error)
    })

}




app.post('/stkPush', async(req, res)=>{
    const phone = req.body.phone.substring(1);
    const amount= req.body.amount
   
    // const auth = "Bearer " + req.safaricom_access_token

    const timestamp = getTimestamp()
    //shortcode + passkey + timestamp
    const password = new Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64')
    
    await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', 
        {   
            "BusinessShortCode": process.env.BUSINESS_SHORT_CODE,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone,
            "PartyB": process.env.BUSINESS_SHORT_CODE,
            "PhoneNumber":`+254${phone}`,
            "CallBackURL":'https://mydomain.com/path',
            "AccountReference": "E-shopIt",
            "TransactionDesc": "Paid online"
            
       },{
        headers:{
            Authorization: `Bearer ${token}`
        }
       }).then((response)=>{
        console.log()
        res.status(200).json(response.data)
       }).catch((error)=>{
        res.status(400).json({error:error.message})
    })


})