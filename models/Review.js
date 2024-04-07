import mongoose from 'mongoose';

const ratingsAndReviewsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
});

const RatingsAndReviews = mongoose.model('ratings_and_reviews', ratingsAndReviewsSchema);

export default RatingsAndReviews;