// same as Assessment-3 but can be extended
const mongoose = require('mongoose');
const ReviewModel = require('./src/model/reviewModel');
require('dotenv').config();

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB connected');
    // ... test cases
    await mongoose.disconnect();
  } catch (err) { console.error(err); }
};
test();