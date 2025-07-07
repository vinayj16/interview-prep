import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, 400, { message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      successResponse(res, 201, {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      errorResponse(res, 400, { message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    errorResponse(res, 500, { message: 'Server error during registration' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      successResponse(res, 200, {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      errorResponse(res, 401, { message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    errorResponse(res, 500, { message: 'Server error during login' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      successResponse(res, 200, {
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      errorResponse(res, 404, { message: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    errorResponse(res, 500, { message: 'Server error' });
  }
};