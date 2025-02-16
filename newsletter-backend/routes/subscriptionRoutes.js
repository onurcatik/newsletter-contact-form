const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// POST /subscribe
router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    // Check if the email is already subscribed
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ error: 'Email is already subscribed.' });
    }

    // Save the new subscription
    const newSubscription = new Subscription({ email });
    await newSubscription.save();

    res.status(200).json({ message: 'Subscription successful!' });
  } catch (error) {
    console.error('Error subscribing email:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
