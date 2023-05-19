const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) =>{
    //get token from headers
    const token = req.headers.authorization;
}