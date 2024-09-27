const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose')

const Profile = require('../models/profileModel');

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

        //create user profile
        const profile = new  Profile({
            user: user._id,
            email:email
        })
        await profile.save();

        res.status(200).json({user, profile, jwtToken})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
    //login userapp
    const loginUser = async (req, res) =>{
        const {email, password} =req.body

    try{
        const user = await User.login(email, password)
        const token =generateToken(user._id)

        res.status(200).json({user, token})

    }catch(error){
        res.status(400).json({error:error.message})
    }
    }

    //get user profile
    const getUserProfile = async(req, res) =>{
    const {id}= req.user
    
    const profile = await Profile.findOne({ user: id});
  
    if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      res.status(200).json(profile);
      return

    }
    
    module.exports = {signUpUser, loginUser,getUserProfile}
