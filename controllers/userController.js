const User = require('../models/userModel');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Define other controller functions for users
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, { $push: { policies: req.body.policies } }, { new: true });
    // const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePolicyFromUser = async (req, res) => {
  try {
    const { id: userId } = req.params; // Extract userId from params
    const { policyId } = req.body; // Extract policyId from request body

    // Check if policyId is provided in the request body
    if (!policyId) {
      return res.status(400).json({ message: 'Policy ID is required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { policies: { _id: policyId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the updated user object in the response
    res.json(updatedUser);
  } catch (error) {
    // Handle errors
    res.status(400).json({ message: error.message });
  }
};

const generateAccessAndRefereshTokens = async(userId) =>{
  try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccesToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({ validateBeforeSave: false })

      return {accessToken, refreshToken}


  } catch (error) {
      console.log(error);
      // return res.status(401).json({ message: "Something went wrong while generating referesh and access token", error});
  }
}
exports.login = async (req, res) => {
    const { email, userName, password } = req.body;
    console.log(email);
    console.log(password);
    if(!userName && ! email){
      return res.status(401).json({ message: 'username or email required' });
    }
    try {
        // Check if the user exists
        const user = await User.findOne({ 
          $or: [{userName}, {email}]
        });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password 1' });
        }
      console.log(user.password);
        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log(isPasswordCorrect);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid email or password 2' });
        }

        // Send tokens in the response
        const {accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);
        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


