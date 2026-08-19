require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const reviewRoutes = require('./routes/review.route');

const app = express();
app.use(express.json());

app.use('/reviews', reviewRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ success: false, message, errors: err.errors || [] });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));