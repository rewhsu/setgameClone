import React from 'react';
import styles from './Card.css';
import Rectangle from '../Rectangle/Rectangle';
import Circle from '../Circle/Circle';
import Triangle from '../Triangle/Triangle';
import Shape from '../Shape/Shape';




var Card = ({ data, toggleCard }) =>
  <div className={styles.cell} onClick={ () => toggleCard(data.stageId) }>
    {/*<p>stageId: {data.stageId}</p>
    <p>cardId: {data.cardId}</p>
    {data.isSelected ? 'selected' : ''}*/}
    <Shape data={data} />
  </div>;

export default Card;