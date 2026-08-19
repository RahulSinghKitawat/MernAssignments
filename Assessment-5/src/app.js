require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const reviewRoutes = require('./routes/review.route');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.use('/reviews', reviewRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));