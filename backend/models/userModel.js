const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    validate: [validator.isStrongPassword, 'Password not strong enough']
  },
  role: {
    type: String,
    enum: ['Admin', 'Recruiter', 'JobSeeker'],
    default: 'JobSeeker'
  },
  invitationCode: String // used for job seeker invitations
});

// static signup method for Job Seeker
userSchema.statics.signup = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  
  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough');
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, role: 'JobSeeker' });
  return user;
};

// static login method
userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('Email and password are required');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email or password');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect email or password');
  }

  return user;
};

// static method to login a job seeker with invitation
userSchema.statics.loginWithInvitation = async function(email, invitationCode) {
  if (!email || !invitationCode) {
    throw Error('Email and invitation code are required');
  }

  const user = await this.findOne({ email, invitationCode });
  if (!user) {
    throw Error('Invalid invitation code');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
