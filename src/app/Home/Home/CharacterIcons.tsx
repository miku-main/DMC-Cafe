import React from 'react';
import styles from './HomePage.module.css';

const CharacterIcons: React.FC = () => {
  return (
    <div className={styles.characterIcons}>
      <img src="/egg.png" alt="Egg Icon" className={styles.characterIcon} />
      <img src="/waffle.png" alt="Waffle Icon" className={styles.characterIcon} />
      <img src="/coffee.png" alt="Coffee Icon" className={styles.characterIcon} />
      <img src="/bacon.png" alt="Bacon Icon" className={styles.characterIcon} />
    </div>
  );
};

export default CharacterIcons;
