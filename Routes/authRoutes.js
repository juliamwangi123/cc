const{Router} = require('express');
const {signUpUser, loginUser} = require ('../Controllers/authControllers')


const router = Router()

//auth routes 
//signup
router.post('/new/sigin', signUpUser);
router.post('/new/login', loginUser);

module.exports = router