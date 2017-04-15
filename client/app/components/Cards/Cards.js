import React from 'react';
import styles from './Cards.css';
import Card from '../Card/Card.js'

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.cards = [];
    this.stage = props.stage;
  }
  addCard(index) {
    return (
      <div className={styles.cardContainer}>
        <Card id={index} />
      </div>
    )
  }
  initializeStage() {
    for (var i = 0; i < 9; i++) {
      this.cards.push(this.addCard(i));
    }
  }
  componentWillMount() {
    this.initializeStage();
  }
  render() {
    return (
      <div className={styles.stage}>
      <div>{this.stage}</div>
        {this.cards}
      </div>
    );
  }
}