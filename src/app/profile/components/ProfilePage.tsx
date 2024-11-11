// src/pages/ProfilePage.tsx
import React from 'react';
import Navbar from '../../Home/Home/NavBar';
import ProfileCard from '../components/ProfileCard';
import HomeIcon from '../../Home/Home/HomeIcon';
import styles from './ProfilePage.module.css'; // Import CSS module

const ProfilePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
        <HomeIcon />
      <div className={styles.profilePage}> {/* Apply CSS module class */}
        <Navbar />
        <div className={styles.profileContent}> {/* Apply CSS module class */}
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
