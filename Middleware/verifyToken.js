const jwt = require('jsonwebtoken');
require('dotenv').config()


const requireAuth = (req, res, next) =>{
    //get token from headers
    const token = req.headers.authorization;

    //verify token if it exists
    if(token){
        jwt.verify(token, process.env.SECRET, (err, decodedTokem)=>{
            if (err) {
                console.log({ err: err.message })
                return res.status(403).json({ err: err.message });
              }
              req.decodedTokem;
              next() 
        }) }
        return res.status(401).json({ error: 'No token provided' });
};

