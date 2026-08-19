require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const reviewRoutes = require('./routes/review.route');
const staffRoutes = require('./routes/staff.route');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/reviews', reviewRoutes);
app.use('/staff', staffRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));