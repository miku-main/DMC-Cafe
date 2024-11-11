// src/pages/ProfilePage.tsx
import React from 'react';
import Navbar from '../../Home/components/NavBar';
import ProfileCard from '../Todo/components/ProfileCard';
import HomeIcon from '../../Home/components/HomeIcon';
import styles from './ProfilePage.module.css'; // Import CSS module

const ProfilePage: React.FC = () => {
  return (
    <div className={styles.profilePage}> {/* Apply CSS module class */}
      <Navbar />
      <div className={styles.profileContent}> {/* Apply CSS module class */}
        <ProfileCard />
      </div>
    </div>
  );
};

export default ProfilePage;
