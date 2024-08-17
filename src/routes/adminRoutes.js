import express from 'express';
const router = express.Router();

import Admin from '../models/adminSchema.js'

// Route to register a new admin
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create and save new admin
    const admin = new Admin({ name, email, password, role });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to login an admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare passwords
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Respond with success or token (if using JWT)
    res.status(200).json({ message: 'Admin logged in successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update an admin's details
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the admin
    const admin = await Admin.findByIdAndUpdate(id, updates, { new: true });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to delete an admin
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the admin
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get admin details by ID
router.get('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find admin by ID
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
