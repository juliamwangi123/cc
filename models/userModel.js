const mongoose = require ('mongoose');
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName:{   
        lowercase: true, 
        type: String,
        required: true,
        unique: true,
        default: function() {
          return require('uuid').v4();
        }
    },
    email:{
        required:true,
        type:String,
        unique:true,
        lowercase: true, 
    },
    password:{
        required:true,
        type:String,
    }
});


//static signup method

userSchema.statics.signUp = async function(email, password){
    //check if the field are empty
    if( !email || !password){
        throw Error("Field should not be empty");
    }

    //check if email is unique
    if(!validator.isEmail(email)){
        throw Error('Enter valid email')
    };

    //check if the password is strong
    if(!validator.isStrongPassword(password)){
        throw Error('Password not stong enough')
    }

    //check if the user exist
    const userExist = await this.findOne({email});
    if(userExist){ throw Error('User already exist')};

    //hash password
    const salt =await bcrypt.genSalt(10)
    const hashPassword =await bcrypt.hash(password, salt)

    //register the user
    const newUser = await this.create({email, password: hashPassword });

    return newUser;
};

//static login method
userSchema.statics.login = async function (email, password){

    //check empty fields
    if(!email || !password){ throw Error('Field should not be empty')};

    //get user if they exist
    const getUser = await this.findOne({email});

    //if email does not exist throw error
    if(!getUser){ throw Error('Email does not exist')}

    //if user exist match passowrd and the hashed password
    const matchPassword = await  bcrypt.compare(password , getUser.password);

    if(!matchPassword){ throw Error('Wrong Password')};

    return getUser;
}

module.exports = mongoose.model('user', userSchema);