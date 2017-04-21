import React from 'react';
import styles from './Stage.css';
import Card from '../Card/Card.js';

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCard = props.toggleCard.bind(this);
    this.addDeck = props.addDeck;
  }
  renderCard(data) {
    return (
      <div className={styles.cardContainer}>
        <Card data={data} selections={this.props.selections} dealCard={this.props.dealCard} toggleCard={this.props.toggleCard}/>
      </div>
    )
  }
  dealInitialCards(cards) {
    for (var i = 0; i < 9; i++) {
      this.props.dealCard(i, this.props.deck[i]);
    }
  }
  componentWillMount() {
    this.props.resetDeck();
    this.dealInitialCards();
  }
  render() {
    console.log('rendering Cards', this.props);
    return (
      <div className={styles.stage}>
        {this.props.stage.map(cell => (
          this.renderCard(cell)
        ))}
      </div>
    );
  }
}