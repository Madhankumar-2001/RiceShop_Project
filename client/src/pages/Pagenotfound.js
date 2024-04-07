// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Layout from "./../components/Layout/Layout";
// import RatingsAndReviews from "../components/RatingsAndReviews"; // Adjust the path as needed

// const Pagenotfound = () => {
//   const [showRatingsPage, setShowRatingsPage] = useState(false);

//   // Function to toggle displaying the ratings page
//   const toggleRatingsPage = () => {
//     setShowRatingsPage(!showRatingsPage);
//   };

//   return (
//     <Layout title={"Rating and Reviews"}>
//       {showRatingsPage ? (
//         <RatingsAndReviews productId={"your-product-id"} />
//       ) : (
//         <div className="pnf">
//           <h1 className="pnf-heading" strong><u><b>RATINGS AND REVIEWS</b></u></h1>
//           <h2 className="pnf-heading">Click the below button to give the ratings!..</h2>
//           <button onClick={toggleRatingsPage} className="pnf-btn">
//             Show Ratings Page
//           </button>
//           <Link to="/" className="pnf-btn">
//             Go Back
//           </Link>
//         </div>
//       )}
//     </Layout>
//   );
// };

// export default Pagenotfound;



// /*import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Layout from "./../components/Layout/Layout";
// import RatingsAndReviews from "../components/RatingsAndReviews"; // Adjust the path as needed

// const Pagenotfound = () => {
//   const [showRatingsPage, setShowRatingsPage] = useState(false);

//   // Function to toggle displaying the ratings page
//   const toggleRatingsPage = () => {
//     setShowRatingsPage(!showRatingsPage);
//   };

//   return (
//     <Layout title={"Page not found"}>
//       {showRatingsPage ? (
//         <RatingsAndReviews productId={"your-product-id"} />
//       ) : (
//         <div className="pnf">
//           <h1 className="pnf-title">404</h1>
//           <h2 className="pnf-heading">Oops ! Page Not Found</h2>
//           <button onClick={toggleRatingsPage} className="pnf-btn">
//             Show Ratings Page
//           </button>
//           <Link to="/" className="pnf-btn">
//             Go Back
//           </Link>
//         </div>
//       )}
//     </Layout>
//   );
// };

// export default Pagenotfound;
// */


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
<div className="form-containers" style={{ minHeight: "90vh", width: "80%",margin:"auto" }}>
      <h3 style={{ textAlign: "center", fontWeight: "bold" }}>FEEDBACK PAGE</h3>
      <br></br>
      <h4>Welcome to the feedback page, where you can share your thoughts about our services and merchandise. <br></br>Your input will help us make improvements to our store.</h4>
      <br></br>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
  <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control form-control-sm"
            style={{ width: "170%",height: "50px" }}
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
      className="form-control form-control-sm"
      style={{ width: "170%" ,height: "50px"}}
      placeholder="Enter Your Email"
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="text"
      value={feedback}
      onChange={(e) => setFeedback(e.target.value)}
      className="form-control form-control-sm"
      style={{ width: "170%" ,height: "50px"}}

      placeholder="Feedback"
      required
    />
  </div>
  {showMessage && <p className="text-success">Thank you for giving the review!</p>}
  <div>
  <button type="submit" className="btn btn-primary btn-sm" style={{ width: "150px" }}>
  SUBMIT
</button>

<button
  type="button"
  className="btn btn-secondary btn-sm ml-2"
  onClick={handleCancel}
  style={{ width: "150px" }} // Adjust the width as needed
>
  CANCEL
</button>

  </div>
</form>

    </div>
  );
};

export default RatingsAndReviewsForm;

