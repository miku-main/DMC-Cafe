"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CreateAccountCard.module.css";

const CreateAccountCard: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true); // Start loading

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          setIsLoading(false); // Stop loading before redirect
          router.push("/login");
        }, 2000); // Redirect to login
      } else {
        const { error } = await response.json();
        setError(error || "Failed to create account. Please try again.");
      }
    } catch (err) {
      console.error("Error creating account:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className={styles.profileCard}>
      <img
        src="/images/user-icon.png"
        alt="User Icon"
        className={styles.profileImage}
      />
      <form className={styles.form} onSubmit={handleCreateAccount}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type here"
          className={styles.input}
          required
        />

        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type here"
          className={styles.input}
          required
        />

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default CreateAccountCard;

