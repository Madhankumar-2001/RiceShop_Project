import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices"; // Import Prices component
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import { BsStarFill, BsStar } from "react-icons/bs";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0); // State to hold the selected rating
  const [clickedStars, setClickedStars] = useState({}); // State to track clicked stars for each product

  // Function to fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Function to fetch total count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Function to handle category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Function to filter products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Handler for clicking a star to rate a product
  const handleRatingClick = (productId, newRating) => {
    if (clickedStars[productId]) {
      // If stars are already clicked, do nothing
      return;
    }
    // Implement logic here to handle the rating selection
    // For example, you might want to send a request to the server to update the rating of the product
    console.log(`Rated ${newRating} stars for product ID ${productId}`);
    // Update the UI if needed
    // For demonstration purposes, let's update the rating locally in state
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        return { ...product, rating: newRating };
      }
      return product;
    });
    setProducts(updatedProducts);
    // Mark stars as clicked for this product
    setClickedStars({ ...clickedStars, [productId]: true });
    toast.success("Thank you for rating our Product");
  };

  // useEffect to fetch categories and total count of products
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // useEffect to fetch products when page changes
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // useEffect to fetch products when filters change
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best offers "}>
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <

h5 className="card-title">{p.name}</h5>
                    <p className="card-title card-price">
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                  </div>
                  <p className="card-text">{p.description.substring(0, 60)}...</p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                        toast.success("Item Added to cart");
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                  {/* 5-star rating */}
                  <div className="rating">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        onClick={() => handleRatingClick(p._id, index + 1)} // Pass the product ID and new rating
                        style={{ cursor: clickedStars[p._id] ? "not-allowed" : "pointer" }} // Disable pointer events if stars are already clicked
                      >
                        {index + 1 <= p.rating ? (
                          <BsStarFill className="star-icon" />
                        ) : (
                          <BsStar className="star-icon" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="load-more text-center">
            {products.length < total && (
              <button className="btn btn-primary" onClick={() => setPage(page + 1)}>
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
