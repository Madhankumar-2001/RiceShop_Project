import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  const [showRiceVarieties, setShowRiceVarieties] = useState(false);

  const riceVarieties = [
    "Basmati Rice",
    "Jasmine Rice",
    "Biryani Rice",
    "Ponni Rice",
    "Mappillai samba",
    "Ponni kuranai",
    "karuppu kavuni",
    "IR20",
    "Ponni kuranai"
  ];

  return (
    <Layout title={"About us - RiceShop app"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome to our <b>Rice Shop</b>, where quality meets variety! We take
            pride in offering a diverse selection of premium rice varieties
            sourced from the finest fields. 
            With a commitment to excellence, we ensure that every grain meets
            the highest standards of quality and freshness. Explore our curated
            range of rice products, from exotic blends to staple varieties,
            providing a culinary adventure for every palate. Join us on a
            journey of taste and nutrition as we bring you the best in rice,
            creating memorable dining experiences for you and your family.
          </p>
          <div className="mt-4">
            <h4>Rice Varieties We Offer:</h4>
            <button
              className="btn btn-link"
              onClick={() => setShowRiceVarieties(!showRiceVarieties)}
            >
              {showRiceVarieties ? "Hide Rice Varieties" : "Show Rice Varieties"}
            </button>
            {showRiceVarieties && (
              <ul>
                {riceVarieties.map((variety, index) => (
                  <li key={index}>{variety}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
