
import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  // Function to handle the click event on the location button
  const handleLocationButtonClick = () => {
    // Define the Google Maps URL for the provided location
    const googleMapsUrl = 'https://maps.app.goo.gl/5aMoo7rvtbzWKZna9';
    
    // Open the URL in a new tab
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contact.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any Query and info about product feel free to call anytime we 24X7
            available
          </p>
          <p className="mt-3">
            <BiMailSend /> : Sriannamarricemandi22@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 8610075883
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
          {/* Button to view location */}
          <button className="btn btn-primary mt-3" onClick={handleLocationButtonClick}>View Location</button>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
