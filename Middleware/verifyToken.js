const jwt = require('jsonwebtoken');
require('dotenv').config()


const requireAuth = (req, res, next) =>{
    //get token from headers
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)

    //verify token if it exists
    if(token){
        jwt.verify(token, process.env.SECRET, (err, decodedToken)=>{
            if (err) {
                console.log({ err: err.message })
                return res.status(403).json({ err: err.message });
              }else{
                req.user = decodedToken
                next() 
              }
             
        }) }else{
            return res.status(401).json({ error: 'No token provided' });

        }
};

module.exports = {requireAuth}
