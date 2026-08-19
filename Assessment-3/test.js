const mongoose = require('mongoose');
const ReviewModel = require('./src/model/reviewModel');
require('dotenv').config();

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB connected');

    await ReviewModel.create({
      title: 'Bahut accha product',
      comment: 'Delivery fast thi aur quality bhi acchi hai',
      rating: 5,
      reviewerName: 'Rahul',
    });
    console.log('✅ Valid review saved');

    try {
      await ReviewModel.create({ title: 'Test', comment: 'Valid comment enough length', rating: 6, reviewerName: 'Test' });
    } catch (e) { console.log('✅ rating=6 error:', e.message); }

    try {
      await ReviewModel.create({ title: 'Test2', comment: 'Another valid comment enough length', rating: 3.5, reviewerName: 'Test2' });
    } catch (e) { console.log('✅ rating=3.5 error:', e.message); }

    try {
      await ReviewModel.create({ title: 'Test3', comment: 'Yet another valid comment', rating: 4, reviewerName: 'Test3', status: 'blocked' });
    } catch (e) { console.log('✅ status=blocked error:', e.message); }

    await mongoose.disconnect();
  } catch (err) { console.error(err); }
};
test();