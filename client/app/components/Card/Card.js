import React from 'react';
import styles from './Card.css';
import Shape from '../Shape/Shape';

var Card = ({ data, deck, deckIndex, numSelected, toggleCard }) =>
  <div className={styles.cell} onClick={ () => toggleCard(data.stageId, !data.isSelected, numSelected) }>
    <Shape data={data} />
  </div>;

export default Card;