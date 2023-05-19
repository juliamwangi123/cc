const{Router} = require('express');
const {signUpUser, loginUser,getUserProfile} = require ('../Controllers/authControllers')
const {requireAuth} = require('../Middleware/verifyToken')


const router = Router()

//auth routes 
//signup
router.post('/signup/', signUpUser);
router.post('/login/', loginUser);
router.get('/profile/:id',getUserProfile)

module.exports = router