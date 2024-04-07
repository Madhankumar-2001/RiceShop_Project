import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RatingsAndReviewsForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/reviews', {
        name,
        email,
        feedback
      });
      console.log(response.data);
      setSubmitted(true);
      setShowMessage(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="form-containers" style={{ minHeight: "90vh" }}>
      <form onSubmit={handleSubmit}>
        <h4 className="title">Feedback Form</h4>
        <div className="mb-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Enter Your Name"
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="form-control"
            placeholder="Feedback"
            required
          />
        </div>
        {showMessage && <p className="text-success">Thank you for giving the review!</p>}
        <div>
          <button type="submit" className="btn btn-primary">
            SUBMIT
          </button>
          <button type="button" className="btn btn-secondary ml-2" onClick={handleCancel}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default RatingsAndReviewsForm;
