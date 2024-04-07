import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BsStarFill, BsStar } from "react-icons/bs"; // Import star icons
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/ProductDetailsStyles.css"; // Import custom styles

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [cart, setCart] = useCart();
  const [rating, setRating] = useState(0); // State to hold the selected rating
  const [clickedStars, setClickedStars] = useState({}); // State to track clicked stars

  // Initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      getReviews(data?.product._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Get reviews for the product
  const getReviews = async (productId) => {
    try {
      const { data } = await axios.get(`/api/v1/product/reviews/${productId}`);
      setReviews(data?.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  // Add to cart function
  const addToCart = (item) => {
    setCart([...cart, item]);
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
    toast.success("Item Added to cart");
  };

  // Handler for clicking a star to rate a product
  const handleRatingClick = (newRating) => {
    if (clickedStars[product._id]) {
      // If stars are already clicked, do nothing
      return;
    }
    // Update the UI if needed
    setRating(newRating);
    // Mark stars as clicked for this product
    setClickedStars({ ...clickedStars, [product._id]: true });
    // Implement logic to send the rating to the server if needed
    // For demonstration purposes, you can directly update the product's rating in state
    setProduct({ ...product, rating: newRating });
    // Display success message
    toast.success("Thank you for rating our Product");
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          {/* Main product image */}
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="main-product-image"
            alt={product.name}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">{product.name}</h1> {/* Product name */}
          <hr />
          {/* Product details */}
          <h6>
            <strong>Description :</strong> {product.description}
          </h6>{" "}
          {/* Bolded description heading */}
          <h6>
            <strong>Price :</strong>
            {product?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </h6>{" "}
          {/* Bolded price heading */}
          <h6>
            <strong>Category :</strong> {product?.category?.name}
          </h6>{" "}
          {/* Bolded category heading */}
          {/* Quantity */}
          <h6>
            <strong>Quantity :</strong> {product.quantity}
          </h6>{" "}
          {/* Bolded quantity heading */}
          {/* Star rating */}
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => handleRatingClick(index + 1)} // Pass the new rating
                style={{
                  cursor: clickedStars[product._id] ? "not-allowed" : "pointer",
                }} // Disable pointer events if stars are already clicked
              >
                {index + 1 <= rating ? (
                  <BsStarFill className="star-icon" />
                ) : (
                  <BsStar className="star-icon" />
                )}
              </span>
            ))}
          </div>
          <button
            className="btn btn-secondary ms-1"
            style={{ width: "300px", height: "70px" }}
            onClick={() => addToCart(product)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              {/* Smaller images for related products */}
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="related-product-image"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => addToCart(p)}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-secondary"
          style={{ width: "300px", height: "70px" }} // You can edit width and height here
          onClick={() => navigate("/")}
        >
          Back to Home Page
        </button>
      </div>
    </Layout>
  );
};

export default ProductDetails;
