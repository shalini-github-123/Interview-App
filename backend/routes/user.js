const express = require('express')
const { loginUser, signupUser, createRecruiter, loginJobSeeker, logoutUser } = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// public routes
router.post('/login', loginUser)
router.post('/signup', signupUser)
router.post('/jobseeker/login', loginJobSeeker)
router.post('/logout', logoutUser);

// protected route for Admin creating a Recruiter
router.post('/admin/create-recruiter', requireAuth(['Admin']), createRecruiter)

module.exports = router
