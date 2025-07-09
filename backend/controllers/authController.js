import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    console.log('=== REGISTER REQUEST ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      console.error('Missing required fields:', { name: !!name, email: !!email, password: '***' });
      return errorResponse(res, 400, { message: 'All fields are required' });
    }

    console.log('Checking if user exists...');
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.error('Registration failed: User already exists');
      return errorResponse(res, 400, { message: 'User already exists' });
    }

    console.log('Creating new user...');
    const user = new User({
      full_name: name,
      email,
      password_hash: password, // Will be hashed by pre-save hook
    });

    // Save the user to trigger pre-save hooks
    const savedUser = await user.save().catch(error => {
      console.error('Error saving user:', error);
      throw error;
    });

    console.log('User created successfully:', {
      id: savedUser._id,
      email: savedUser.email,
      name: savedUser.full_name
    });
    
    // Ensure consistent response format
    const responseData = {
      success: true,
      data: {
        _id: savedUser._id,
        name: savedUser.full_name,
        email: savedUser.email,
        token: generateToken(savedUser._id),
      }
    };
    
    console.log('Sending success response:', responseData);
    res.status(201).json(responseData);
    
  } catch (error) {
    console.error('=== REGISTRATION ERROR ===');
    console.error('Error details:', error);
    
    let errorMessage = 'Registration failed. Please try again.';
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      errorMessage = Object.values(error.errors).map(e => e.message).join('. ');
    } else if (error.code === 11000) {
      errorMessage = 'Email is already registered';
    }
    
    console.error('Sending error response:', errorMessage);
    errorResponse(res, 400, { message: errorMessage });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    console.log('Login attempt:', { email: req.body.email });
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password_hash');
    console.log('User found:', user ? 'Yes' : 'No');

    if (user) {
      const isMatch = await user.matchPassword(password);
      console.log('Password match:', isMatch);
      
      if (isMatch) {
        successResponse(res, 200, {
          _id: user._id,
          name: user.full_name, // Using full_name as name for frontend
          email: user.email,
          token: generateToken(user._id),
        });
        return;
      }
    }
    
    console.log('Login failed - invalid credentials');
    errorResponse(res, 401, { message: 'Invalid email or password' });
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