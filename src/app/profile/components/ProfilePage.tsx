"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../Home/Home/NavBar";
import ProfileCard from "../components/ProfileCard";
import HomeIcon from "../../Home/Home/HomeIcon";
import styles from "./ProfilePage.module.css"; // Import CSS module

const ProfilePage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user name or other profile details if necessary
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const session = await response.json();

        if (session?.user?.name) {
          setUserName(session.user.name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={styles.homePage}>
      <HomeIcon />
      <div className={styles.profilePage}>
        <Navbar />
        <div className={styles.profileContent}>
          <h1>Welcome, {userName || "User"}!</h1>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

