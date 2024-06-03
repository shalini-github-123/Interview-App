const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { request } = require('express');

const createToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: '3d' });
};

// login a user
// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user;
    let role;

    // Check if the user is an admin
    const isAdmin = await isAdminUser(email, password);

    if (isAdmin) {
      // If the user is an admin, set a unique identifier (e.g., email) as _id
      user = { _id: email, role: 'Admin' };
      role = 'Admin';
    } else {
      // If the user is not an admin, perform regular user login
      user = await User.login(email, password);
      role = user.role;
    }

    // Create token based on user role
    const token = createToken(user._id, role);

    // Return response with email, token, and role
    res.status(200).json({ email, token, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// signup a user (Job Seekers only)
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id, user.role);

    res.status(200).json({ email, token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRecruiter = async (req, res) => {
  const { email, password } = req.body;
  console.log("check 6", email, password);

  try {
    const isAdmin = await isAdminUser(req.user.email, req.user.password);
    console.log("check 7", isAdmin);

    if (!isAdmin) {
      return res.status(403).json({ error: 'Only Admins can create Recruiters' });
    }

    // Create the recruiter user
    const recruiterUser = await User.signup(email, password);
    console.log("check 8");
    recruiterUser.role = 'Recruiter';
    await recruiterUser.save();
    console.log("check 9");

    res.status(201).json({ email: recruiterUser.email, role: recruiterUser.role });
    console.log("check 10", res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




// Helper function to check if the user is an admin
// Helper function to check if the user is an admin
const isAdminUser = (email, password) => {
  // Retrieve admin credentials from environment variables
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
 
  console.log(adminEmail,email,adminPassword,password,"admin details inside isadminuser");
  // Compare provided email and password with admin credentials
  if (email === adminEmail && password === adminPassword) {
    console.log("true");
    return true; // User is an admin
  } else {
    console.log("false");
    return false; // User is not an admin
  }
};



// job seeker invitation login
const loginJobSeeker = async (req, res) => {
  const { email, invitationCode } = req.body;

  try {
    const user = await User.loginWithInvitation(email, invitationCode);
    const token = createToken(user._id, user.role);

    res.status(200).json({ email, token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  // Invalidate the user session or token
  try {
    req.session = null; // If using session-based auth
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { signupUser, loginUser, loginJobSeeker, createRecruiter, logoutUser };
