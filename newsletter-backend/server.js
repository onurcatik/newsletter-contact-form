const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// userRoutes dosyasını dahil et


app.use(express.static(path.join(__dirname, 'newsletter-frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'newsletter-frontend/build', 'index.html'));
});




// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const contactRoutes = require('./routes/contactRoutes');
const emailRoutes = require("./routes/emailRoutes");

app.use('/subscribe', subscriptionRoutes);
app.use('/contact', contactRoutes);
app.use("/email", emailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

