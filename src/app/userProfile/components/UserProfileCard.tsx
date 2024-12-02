"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./UserProfileCard.module.css"; // Import the CSS module
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const predefinedImages = [
    "/bacon.png",
    "/coffee.png",
    "/egg.png",
    "/waffle.png",
  ];
  
  const UserProfileCard: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedImage, setSelectedImage] = useState<string>("");
    const { data: session } = useSession();
    const [userId, setUserId] = useState<string | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (session?.user?.id) {
            setUserId(session.user.id);
        } else {
            setError("User ID is missing. Please try logging in again.");
        }
    }, [session]);
    const handleSaveImage = async () => {
        if (!selectedImage) {
          setError("Please select an image.");
          return;
        }
      
        if (!userId) {
          setError("User ID is missing. Please try logging in again.");
          return;
        }
      
        try {
          const response = await fetch("/api/users/updateProfilePicture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, profilePicture: selectedImage }),
          });
      
          if (response.ok) {
            const data = await response.json();
            alert("Profile picture updated successfully!");
      
            // Refresh the session to update the profile picture
            await signIn("credentials", { redirect: false });
            
            router.push(data.redirect || "/profile");
          } else {
            const errorData = await response.json();
            setError(errorData.error || "Error updating profile picture.");
          }
        } catch (err) {
          console.error("Error saving profile picture:", err);
          setError("An unexpected error occurred. Please try again.");
        }
      };
  
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Select Your Profile Picture</h1>
        <div className={styles.imageGrid}>
          {predefinedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Profile ${index + 1}`}
              className={`${styles.profileImage} ${
                selectedImage === image ? styles.selected : ""
              }`}
              onClick={() => {
                setSelectedImage(image);
                setError("");
              }}
            />
          ))}
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.saveButton} onClick={handleSaveImage}>
          Save
        </button>
      </div>
    );
  };
  
  export default UserProfileCard;