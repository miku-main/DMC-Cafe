import React from "react";
import Navbar from "../../Home/Home/NavBar";
import UserProfileCard from "../components/UserProfileCard";
import styles from "./UserProfilePage.module.css"; // Import CSS module

const UserProfilePage: React.FC = () => {
  return (
    <div className={styles.profilePage}>
      <Navbar />
      <div className={styles.profileContent}>
        <UserProfileCard />
      </div>
    </div>
  );
};

export default UserProfilePage;
