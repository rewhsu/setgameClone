import React from 'react';
import styles from './Sidebar.css';

var Sidebar = ({ points, addPoints, validateSelection, selections, deck }) =>
  <div className={styles.sidebar}>
    <div className={styles.points}>{points}</div>
    <button className={styles.button1} onClick={() => validateSelection(selections, deck)}>Validate</button>
    <button className={styles.button2} onClick={() => addPoints(2)}>Test Add</button>
    <button className={styles.button3} onClick={() => addPoints(-2)}>Test Sub</button>
  </div>;

export default Sidebar;