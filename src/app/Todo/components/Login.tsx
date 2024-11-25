"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css"; // Styling for the card

function Login() {
    const router = useRouter(); // Router for redirection

    return (
        <div className={styles.loginCardWrapper}>
            <div className={styles.loginCard}>
                <h2 className={styles.loginMessage}>Please log in to manage your tasks</h2>
                <button
                    className={styles.loginButton}
                    onClick={() => router.push("/login")} // Redirect to login component
                >
                    Log In
                </button>
            </div>
        </div>
    );
}

export default Login;
