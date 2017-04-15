import React from 'react';
import styles from './Card.css';
import Rectangle from '../Rectangle/Rectangle';

var Card = ({ data, toggleCard }) =>
  <div className={styles.cell} onClick={ () => toggleCard(data.stageId) }>
    {/*<p>stageId: {data.stageId}</p>
    <p>cardId: {data.cardId}</p>
    {data.isSelected ? 'selected' : ''}*/}
    <Rectangle numObjects={3}/>
  </div>;

export default Card;