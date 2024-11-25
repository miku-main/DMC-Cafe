"use client";

import React from "react";
import Navbar from "../Home/Home/NavBar";
import HomeIcon from "../Home/Home/HomeIcon";
import CreateAccountCard from "./components/CreateAccountCard";
import styles from "./CreateAccountPage.module.css";

const CreateAccountPage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      {/* Navbar stays fixed at the top */}
      <Navbar />
      
      {/* Place HomeIcon independently to avoid interfering with layout */}
      <HomeIcon />

      {/* Main content section */}
      <div className={styles.createAccountPage}>
        <div className={styles.profileContent}>
          <CreateAccountCard /> {/* Centered CreateAccountCard */}
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;




