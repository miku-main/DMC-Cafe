"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./HomePage.module.css";

const LoginButton: React.FC = () => {
    const router = useRouter();

    const handleLoginClick = () => {
        localStorage.setItem("isLoggedIn", "true"); // Set the logged-in status
        router.push("/"); // Redirect to home page after login
    };

    return (
        <button onClick={handleLoginClick} className={styles.loginButton}>
            Log in
        </button>
    );
};

export default LoginButton;
