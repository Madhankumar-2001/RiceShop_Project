import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const goToRatingsPage = () => {
    navigate("/ratings-and-reviews"); // Navigate directly to the Ratings and Reviews page
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary fixed-top"
        style={{ padding: "10px 0" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 RiceShop
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item" style={{ marginLeft: "2px" }}>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown" style={{ marginLeft: "3px" }}>
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item" style={{ marginLeft: "-3px" }}>
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item" style={{ marginLeft: "2px" }}>
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {auth?.user?.role !== 1 && ( // Hide cart and feedback for admin
                    <>
                      <li
                        className="nav-item"
                        style={{ marginRight: "10px", marginLeft: "3px" }}
                      >
                        <Link to="/cart" className="nav-link">
                          <Badge
                            count={cart?.length}
                            showZero
                            offset={[10, -5]}
                          >
                            Cart
                          </Badge>
                        </Link>
                      </li>
                      <li className="nav-item">
              <Link to="/ratings-and-reviews" className="nav-link">
                Feedback
              </Link>
            </li>
                    </>
                  )}
                  <li
                    className="nav-item dropdown"
                    style={{ marginLeft: "-2px" }}
                  >
                    <Link
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <div style={{ width: "60px" }}></div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
