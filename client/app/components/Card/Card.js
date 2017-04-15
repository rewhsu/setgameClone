import React from 'react';
import styles from './Card.css';

var Card = ({ data }) =>
  <div className={styles.cell}>
    <p>stageId: {data.stageId}</p>
    <p>cardId: {data.cardId}</p>
    <p>isSelected: {data.isSelected}</p>
  </div>;

export default Card;