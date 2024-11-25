// src/pages/ProfilePage.tsx

import React from "react";
import Navbar from "../Home/Home/NavBar";
import ProfileCard from "../profile/components/ProfileCard";
import HomeIcon from "../Home/Home/HomeIcon";
import styles from "./ProfilePage.module.css"; // Import CSS module
import { signOut } from "next-auth/react";

const ProfilePage: React.FC = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect to home after logout
  };

  return (
    <div className={styles.profilePage}> {/* Apply CSS module class */}
      <Navbar onLogout={handleLogout} />
      <div className={styles.profileContent}> {/* Apply CSS module class */}
        <ProfileCard />
      </div>
    </div>
  );
};

export default ProfilePage;

