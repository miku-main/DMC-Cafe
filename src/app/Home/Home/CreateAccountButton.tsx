"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./CreateAccountPage.module.css";

const CreateAccountButton: React.FC = () => {
    const router = useRouter();

    const handleCreateAccountClick = () => {
        router.push("/createAccount"); // Redirect to create account page
      };

    return (
      <button onClick={handleCreateAccountClick} className={styles.button}>
        Create An Account
      </button>
    );
};

export default CreateAccountButton;
