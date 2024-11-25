// src/pages/LoginPage.tsx
import React from 'react';
import Navbar from '../../Home/Home/NavBar';
import LoginCard from './CreateAccountCard';
import HomeIcon from '../../Home/Home/HomeIcon';
import styles from './CreateAccountPage.module.css'; // Import CSS module

const CreateAccountPage: React.FC = () => {
  return (
    <div className={styles.homePage}>
        <HomeIcon />
      <div className={styles.loginPage}> {/* Apply CSS module class */}
        <Navbar />
        <div className={styles.profileContent}> {/* Apply CSS module class */}
          <LoginCard />
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
