const mongoose = require('mongoose');
const User = require('./models/User'); // Import the User model

// Create a new user
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (err) {
    throw new Error(`Error creating user: ${err.message}`);
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw new Error(`Error fetching users: ${err.message}`);
  }
};

// Get a user by ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    return user;
  } catch (err) {
    throw new Error(`Error fetching user: ${err.message}`);
  }
};

// Update a user by ID
const updateUserById = async (userId, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) throw new Error('User not found');
    return user;
  } catch (err) {
    throw new Error(`Error updating user: ${err.message}`);
  }
};

// Delete a user by ID
const deleteUserById = async (userId) => {
  try {
    const result = await User.findByIdAndDelete(userId);
    if (!result) throw new Error('User not found');
    return result;
  } catch (err) {
    throw new Error(`Error deleting user: ${err.message}`);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
};
