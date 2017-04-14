import React from 'react';
import styles from './Card.css';

var Card = (props) => (
  <div className={styles.cell}>
    {props.id}
  </div>
)

export default Card;