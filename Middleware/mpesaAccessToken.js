require('dotenv').config()
const axios = require('axios')


const accessToken = async (req, res, next)=> {
        const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        const auth = new Buffer.from(`${process.env.SAFARICOM_CONSUMER_KEY}:${process.env.SAFARICOM_CONSUMER_SECRET}`).toString('base64')       

        await axios.get(url , {
            headers:
            {
                authorization : `Basic ${auth}`
            }
        }).then((res)=>{
            console.log(res.data)
            next()
        }).catch((error)=>{
            res.status(400).json({error: error.message})
        })

}

module.exports ={accessToken}