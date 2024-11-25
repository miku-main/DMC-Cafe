"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./ProfileCard.module.css";

const ProfileCard: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login"); // Redirect to login page
  };

  const handleCreateAccountClick = () => {
    router.push("/createAccount"); // Redirect to account creation page
  };

  return (
    <div className={styles.profileCard}>
      <img
        src="/images/user-icon.png"
        alt="User Icon"
        className={styles.profileImage}
      />
      <button onClick={handleLoginClick} className={styles.button}>
        Log In
      </button>
      <button onClick={handleCreateAccountClick} className={styles.button}>
        Create An Account
      </button>
    </div>
  );
};

export default ProfileCard;
