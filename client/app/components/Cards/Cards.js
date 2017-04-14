import React from 'react';
import styles from './Cards.css';
import Card from '../Card/Card.js'

export default class Cards extends React.Component {
  initializeStage() {
    var cards = [];
    var card = (
      <div className={styles.cardContainer}>
        <Card />
      </div>
    );
    for (var i = 0; i < 9; i++) {
      cards.push(card);
    }
    return cards;
  }
  render() {
    var cards = this.initializeStage();
    return (
      <div className={styles.stage}>
        {cards}
      </div>
    );
  }
}