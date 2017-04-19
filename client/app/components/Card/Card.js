import React from 'react';
import styles from './Card.css';
import Shape from '../Shape/Shape';

var Card = ({ data, toggleCard }) =>
  <div className={styles.cell} onClick={ () => toggleCard(data.stageId) }>
    {/*<p>stageId: {data.stageId}</p>
    <p>cardId: {data.cardId}</p>
    {data.isSelected ? 'selected' : ''}*/}
    <Shape card={data.card} />
  </div>;

export default Card;