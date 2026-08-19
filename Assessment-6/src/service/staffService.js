const StaffModel = require('../model/staffModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { conflict, unauthorized, notFound } = require('../utils/apiError');

const register = async (data) => {
  const existing = await StaffModel.findOne({ email: data.email });
  if (existing) throw conflict('Email already exists');
  const staff = await StaffModel.create(data);
  const { password, ...staffWithoutPassword } = staff.toObject();
  return staffWithoutPassword;
};

const login = async (email, password) => {
  const staff = await StaffModel.findOne({ email });
  if (!staff) throw unauthorized('Invalid email or password');
  const match = await bcrypt.compare(password, staff.password);
  if (!match) throw unauthorized('Invalid email or password');
  const token = jwt.sign(
    { id: staff._id, department: staff.department },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return { token, staff };
};

const getProfile = async (userId) => {
  const staff = await StaffModel.findById(userId).select('-password');
  if (!staff) throw notFound('Staff not found');
  return staff;
};

module.exports = { register, login, getProfile };