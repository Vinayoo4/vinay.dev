/**
 * Script to create an admin user in the database
 * Run with: node scripts/create-admin.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Admin user details - these should be changed in production
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'adminPassword123',
  role: 'admin'
};

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    // Check if admin user already exists
    const existingUser = await User.findOne({ email: adminUser.email });
    if (existingUser) {
      console.log('Admin user already exists');
      await mongoose.connection.close();
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminUser.password, salt);

    // Create new admin user
    const newAdmin = new User({
      name: adminUser.name,
      email: adminUser.email,
      password: hashedPassword,
      role: adminUser.role
    });

    await newAdmin.save();
    console.log('Admin user created successfully');

    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();