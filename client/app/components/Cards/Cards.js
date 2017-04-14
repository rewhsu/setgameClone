import React from 'react';
import styles from './Cards.css';
import Card from '../Card/Card.js'

export default class Cards extends React.Component {
  addCard(index) {
    return (
      <div className={styles.cardContainer}>
        <Card id={index} />
      </div>
    )
  }
  initializeStage() {
    var cards = [];
    for (var i = 0; i < 9; i++) {
      cards.push(this.addCard(i));
    }
    return cards;
  }
  render() {
    return (
      <div className={styles.stage}>
        {this.initializeStage()}
      </div>
    );
  }
}