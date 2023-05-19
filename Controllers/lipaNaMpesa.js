require('dotenv').config();
const {getTimestamp} = require ("../Utils/timeStamp")
const axios = require('axios')
// @desc initiate stk push
// @method POST
// @route /stkPush
// @access public
const initiateSTKPush = async(req, res) => {

        const phone = req.body.phone.substring(1);
        const amount= req.body.amount
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        // const auth = "Bearer " + req.safaricom_access_token

        const timestamp = getTimestamp()
        //shortcode + passkey + timestamp
        const password = new Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64')
        
        await axios.post(url, 
            {   
                "BusinessShortCode": process.env.BUSINESS_SHORT_CODE,
                "Password": password,
                "Timestamp": timestamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": phone,
                "PartyB": process.env.BUSINESS_SHORT_CODE,
                "PhoneNumber":`+254${phone}`,
                "CallBackURL": `${callback_url}/api/stkPushCallback/${Order_ID}`,
                "AccountReference": "E-shopIt",
                "TransactionDesc": "Paid online"
                
           },{
            header:{
                Authorization: `Bearer ${token}`
            }
           }).then((res)=>{
            console.log(res)
            res.status(200).json(data)
           }).catch((error)=>{
            res.status(400).json({error:error.message})
        })
  

       
}

module.exports = {initiateSTKPush}
