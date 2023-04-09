const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//generate token
const generateToken = (id)=>{
    //use sign method 2 argument paload and secrect
    return jwt.sign({id},process.env.SECRET, {expiresIn: '2d'});
};

//sign up user
const signUpUser = async (req, res) =>{
    const {email, password} = req.body;

    try{
        const user = await User.signUp(email,password);

        const jwtToken = generateToken(user._id);

        res.status(200).json({user, jwtToken})
    }catch(error){
        res.status(400).json({error: error.message})
    }

    //login user
    const loginUser = async (req, res) =>{
        const {email, password} =req.body

    try{
        const user = await User.login(email, password)
        const token =generateToken(user._id)

        res.status(200).json({email, token})

    }catch(error){
        res.status(400).json({error:error.message})
    }
    }


    module.export = {signUpUser, loginUser}
}