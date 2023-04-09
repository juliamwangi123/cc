const{Router} = require('express');
const {signUpUser, loginUser} = require ('../Controllers/authControllers')


const router = Router()

//auth routes 
//signup
router.post('/signin/', signUpUser);
router.post('/login/', loginUser);

module.exports = router