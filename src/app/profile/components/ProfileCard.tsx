"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ProfileCard.module.css";

const ProfileCard: React.FC = () => {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the logged-in user's profile picture from the backend
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const session = await response.json();

        if (session?.user?.profilePicture) {
          setProfilePicture(session.user.profilePicture); // Set the profile picture
        } else {
          setProfilePicture(null); // Fallback to default icon
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setProfilePicture(null);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUserClick = () => {
    router.push("/login"); // Redirect to login page
  };

  const handleCreateAccountClick = () => {
    router.push("/createAccount"); // Redirect to create account page
  };

  return (
    <div className={styles.profileCard}>
      <img
        src={profilePicture || "/images/user-icon.png"} // Display fetched or default icon
        alt="User Icon"
        className={styles.profileImage}
      />
      <button onClick={handleUserClick} className={styles.button}>
        Log In
      </button>
      <button onClick={handleCreateAccountClick} className={styles.button}>
        Create An Account
      </button>
    </div>
  );
};

export default ProfileCard;


