const{Router} = require('express');
const {signUpUser, loginUser} = require ('../Controllers/authControllers')


const router = Router()

//auth routes 
//signup
router.post('/', signUpUser);
router.post('/', loginUser);

module.exports = router