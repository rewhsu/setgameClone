import React from 'react';
import styles from './Card.css';

var Card = ({ data, toggleCard }) =>
  <div className={styles.cell} onClick={ () => toggleCard(data.stageId) }>
    <p>stageId: {data.stageId}</p>
    <p>cardId: {data.cardId}</p>
    {data.isSelected ? 'selected' : ''}
  </div>;

export default Card;