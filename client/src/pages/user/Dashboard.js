import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  const backgroundImageStyle = {
    position: "fixed",
    bottom: "100px",
    right: "0px",
    width: "400px", // Adjust the width as needed
    height: "300px", // Adjust the height as needed
    zIndex: "1", // Ensure it's behind other content
    opacity: "0.7", // Set low opacity
  };

  return (
    <Layout title={"Dashboard - RiceShop App"}>
      <div className="container-fluid m-3 p-3 dashboard" style={{ position: "relative" }}>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Name: {auth?.user?.name}</h3>
              <h3>Email-ID: {auth?.user?.email}</h3>
              <h3>Address: {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
        <img
          src="/images/dashboard.gif"
          alt="Dashboard Icon"
          style={backgroundImageStyle}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
