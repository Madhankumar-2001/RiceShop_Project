import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
  const phoneRegex = /^[0-9]{10}$/;

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-control ${name && !nameRegex.test(name) ? "is-invalid" : ""}`}
              id="exampleInputName"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
            {name && !nameRegex.test(name) && (
              <div className="invalid-feedback">Name should contain only characters.</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${email && !emailRegex.test(email) ? "is-invalid" : ""}`}
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              required
            />
            {email && !emailRegex.test(email) && (
              <div className="invalid-feedback">Please enter a valid email address.</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-control ${password && !passwordRegex.test(password) ? "is-invalid" : ""}`}
              id="exampleInputPassword"
              placeholder="Enter Your Password"
              required
            />
            {password && !passwordRegex.test(password) && (
              <div className="invalid-feedback">Minimum 6 characters with a capital letter, special symbol, and numbers.</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`form-control ${phone && !phoneRegex.test(phone) ? "is-invalid" : ""}`}
              id="exampleInputPhone"
              placeholder="Enter Your Phone"
              required
            />
            {phone && !phoneRegex.test(phone) && (
              <div className="invalid-feedback">Phone number should contain only 10 digits.</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="What is Your Favorite Sports"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
