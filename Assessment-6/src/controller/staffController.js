const staffService = require('../service/staffService');

const register = async (req, res, next) => {
  try {
    const staff = await staffService.register(req.body);
    res.status(201).json({ success: true, message: 'Staff registered', data: staff });
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, staff } = await staffService.login(email, password);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    const { password: _, ...staffWithoutPassword } = staff.toObject();
    res.status(200).json({ success: true, message: 'Login successful', data: staffWithoutPassword });
  } catch (err) { next(err); }
};

const getMe = async (req, res, next) => {
  try {
    const staff = await staffService.getProfile(req.user.id);
    res.status(200).json({ success: true, data: staff });
  } catch (err) { next(err); }
};

const logout = (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  res.status(200).json({ success: true, message: 'Logged out' });
};

module.exports = { register, login, getMe, logout };