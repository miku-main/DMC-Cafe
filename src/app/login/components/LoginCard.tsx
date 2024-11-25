"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./LoginCard.module.css";

const LoginCard: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginClick = async () => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevent automatic redirection
      });

      if (result?.error) {
        setError(result.error || "Invalid email or password. Please try again.");
      } else if (result?.ok) {
        setError(""); // Clear error on success
        router.push("/"); // Redirect to the homepage
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.profileCard}>
      <img
        src="/images/user-icon.png"
        alt="User Icon"
        className={styles.profileImage}
      />
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleLoginClick();
        }}
      >
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

        <button type="submit" className={styles.button}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginCard;
