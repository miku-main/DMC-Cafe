import React from 'react';
import NavBar from './NavBar';
import HomeIcon from './HomeIcon'
import HeaderMessage from './HeaderMessage';
import CharacterIcons from './CharacterIcons';
import MainDescription from './MainDescription';
import LoginButton from './LoginButton';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
    return (
      <div className={styles.homePage}>
        <HomeIcon />
        <div className={styles.homePage}>
          <NavBar />
          <div className={styles.mainContent}>
            <HeaderMessage />
            <CharacterIcons />
            <MainDescription />
            <LoginButton />
          </div>
        </div>
      </div>
    );
  };
  
  export default HomePage;