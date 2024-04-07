// HomePage.js

import React from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import ShopLocation from './ShopLocation';

const HomePage = () => {
    // Function to handle rating click
    const handleRatingClick = async (productId, rating) => {
        try {
            // Send a POST request to your backend API to update the rating
            await axios.post('/api/products/rate', {
                productId,
                rating
            });
            
            // If the request is successful, you can update the UI as needed
            console.log(`Rated ${rating} stars for product ID ${productId}`);
            
            // Here, you might want to update the UI to reflect the new rating
        } catch (error) {
            console.error('Error rating product:', error);
        }
    };

    return (
        <div>
            <h1>Welcome to Rice Shop Management System</h1>
            {/* Other homepage content */}
            
            {/* Shop location component */}
            <ShopLocation />

            {/* Example usage of handleRatingClick function */}
            <button onClick={() => handleRatingClick('product123', 5)}>Rate Product</button>
        </div>
    );
};

export default HomePage;
