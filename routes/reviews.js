import express from 'express';
import Review from '../models/Review.js'; // Import the Mongoose model for reviews

const router = express.Router();

// Route for handling POST requests to create a new review
router.post('/', async (req, res) => {
  try {
    const { name, email, feedback } = req.body;
    const review = new Review({ name, email, feedback });
    await review.save(); // Save the review to the database
    res.status(201).send({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while submitting the review' });
  }
});

export default router;