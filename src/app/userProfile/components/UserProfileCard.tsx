"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const predefinedImages = [
  "/bacon.png",
  "/coffee.png",
  "/egg.png",
  "/waffle.png",
];

const UserProfileCard: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId"); // Retrieve user ID from query params
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing. Please try logging in again.");
    }
  }, [userId]);

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
      // Send the selected image and userId to the backend
      const response = await fetch("/api/users/updateProfilePicture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, profilePicture: selectedImage }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.redirect) {
          router.push(data.redirect); // Redirect to the profile folder
        } else {
          alert("Profile picture updated successfully!");
          router.push("/profile"); // Fallback redirect
        }
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setError(errorData.error || "Error updating profile picture.");
      }
    } catch (err) {
      console.error("Error saving profile picture:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Select Your Profile Picture</h1>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "20px 0" }}>
        {predefinedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Profile ${index + 1}`}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: selectedImage === image ? "3px solid blue" : "1px solid gray",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedImage(image);
              setError(""); // Clear any previous error
            }}
          />
        ))}
      </div>
      {error && <p style={{ color: "red", margin: "10px 0" }}>{error}</p>}
      <button
        onClick={handleSaveImage}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save
      </button>
    </div>
  );
};

export default UserProfileCard;



