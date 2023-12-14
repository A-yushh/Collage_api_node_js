const express = require('express');
const router = express.Router();

const {creatUser,loginUser} = require('../Controller/usersController');
const {creatUserProfile,getUserProfile,getAllUsers} =require('../Controller/usersProfileController')

router.post('/signup',creatUser);
router.post('/login',loginUser);
router.post('/profile',creatUserProfile);
router.get('/getProfile',getAllUsers)
router.get('/getCall',getUserProfile);

module.exports=router;